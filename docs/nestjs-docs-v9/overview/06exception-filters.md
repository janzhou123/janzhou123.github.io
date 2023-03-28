---
sidebar_label: 异常过滤器
title: 异常过滤器
sidebar_position: 6
hide_title: true
description: nestjs的异常过滤器 翻译
keywords: [nestjs, filters, exception, 异常过滤器, zhouxiaoxiao]
---

### 异常过滤器

Nest 带有一个内置的**异常层**，负责处理应用程序中所有未处理的异常。当应用程序代码未处理异常时，该层会捕获该异常，然后自动发送适当的用户友好响应。

![来自静态目录的图像](../../images/nestjs-docs-v9/overview/Filter_1.png)

开箱即用，此操作由内置的全局异常过滤器执行，该过滤器处理类型为`HttpException`（及其子类）的异常。当异常无法识别（既不是 `HttpException` 也不是从`HttpException` 继承的类）时，内置异常过滤器会生成以下默认 JSON 响应：

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

:::tip 提示
全局异常过滤器部分支持 `http-errors` 库。基本上，任何包含 `statusCode` 和 `message` 属性的抛出异常都将正确填充并作为响应发送返回（而不是默认的`InternalServerErrorException` 对于无法识别的异常）。
:::

### 抛出标准异常

Nest 提供了一个内置的`HttpException`类，来自`@nestjs/common`包。对于典型的基于 HTTP REST/GraphQL API 的应用程序，当某些错误条件发生时，最好的做法是发送标准的 HTTP 响应对象。

例如，在 `CatsController` 中，我们有一个`findAll()`方法（ `GET` 路由处理程序）。假设此路由处理程序出于某种原因引发异常。为了演示这一点，我们将按如下方式对其进行硬编码：

```jsx title="cats.controller" showLineNumbers
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

:::tip 提示
我们在这里使用了 `HttpStatus` 。它是从 `@nestjs/common` 包导入的辅助枚举器。
:::

当客户端调用接口的时候，返回的信息如下：

```json
{
  "statusCode": 403,
  "message": "Forbidden"
}
```

`HttpException` 构造函数有两个必要的参数来决定响应:

- `response` 参数定义 `JSON` 响应体。它可以是 `string` 或 `object`，如下所述。

- `status`参数定义`HTTP`[状态代码](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)。

默认情况下，`JSON` 响应主体包含两个属性：

- `statusCode`：默认为 `status` 参数中提供的 `HTTP` 状态代码

- `message`:基于状态的 `HTTP` 错误的简短描述

仅覆盖 `JSON` 响应主体的消息部分，请在 `response`参数中提供一个 `string`。

要覆盖整个 `JSON` 响应主体，请在`response` 参数中传递一个`object`。 `Nest`将序列化对象，并将其作为`JSON` 响应返回。

第二个构造函数参数-`status`-是有效的 `HTTP` 状态代码。 最佳实践是使用从`@nestjs/common`导入的 `HttpStatus`枚举。

**第三个**构造函数参数（可选） - `options` - 可用于提供错误[cause](https://nodejs.org/en/blog/release/v16.9.0/#error-cause)。此`cause`对象不会序列化为响应对象，但它可用于日志记录目的，提供有关导致引发`HttpException`的内部错误的有价值的信息。

这是一个覆盖整个响应正文的示例：

```jsx title="cats.controller" showLineNumbers
@Get()
async findAll() {
  try {
    await this.service.findAll()
  } catch (error) {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, HttpStatus.FORBIDDEN, {
      cause: error
    });
  }
}
```

返回响应结果如下:

```json
{
  "status": 403,
  "error": "This is a custom message"
}
```

### 自定义异常

在许多情况下，不需要编写自定义异常，可以使用内置的 Nest HTTP 异常，如下一节所述。如果确实需要创建自定义异常，最好创建自己的 **exceptions 层次结构**，其中自定义异常继承自`HttpException`基类。通过这种方法，Nest 将识别您的异常，并自动处理错误响应。让我们实现这样一个自定义异常

```jsx title="forbidden.exception" showLineNumbers
export class ForbiddenException extends HttpException {
  constructor() {
    super("Forbidden", HttpStatus.FORBIDDEN);
  }
}
```

由于`ForbiddenException`扩展了基础`HttpException`，它将与内置的异常处理程序无缝协作，因此我们可以在`findAll()`方法中使用它。

```jsx title="cats.controller" showLineNumbers
@Get()
async findAll() {
  throw new ForbiddenException();
}
```

### 内置 HTTP 异常

Nest 提供了一组标准异常，这些异常继承自基础 'HttpException'。这些是从“@nestjs/common”包中公开的，并且代表许多最常见的 HTTP 异常：

- `BadRequestException`
- `UnauthorizedException`
- `NotFoundException`
- `ForbiddenException`
- `NotAcceptableException`
- `RequestTimeoutException`
- `ConflictException`
- `GoneException`
- `HttpVersionNotSupportedException`
- `PayloadTooLargeException`
- `UnsupportedMediaTypeException`
- `UnprocessableEntityException`
- `InternalServerErrorException`
- `NotImplementedException`
- `ImATeapotException`
- `MethodNotAllowedException`
- `BadGatewayException`
- `ServiceUnavailableException`
- `GatewayTimeoutException`
- `PreconditionFailedException`

所有内置异常还可以使用`options`参数提供错误原因和错误描述：

```jsx showLineNumbers
throw new BadRequestException("Something bad happened", {
  cause: new Error(),
  description: "Some error description",
});
```

使用上述代码，返回的响应体如下：

```json
{
  "message": "Something bad happened",
  "error": "Some error description",
  "statusCode": 400
}
```

### 异常过滤器 filter

虽然内置异常过滤器可以自动为你处理许多情况，但你可能希望对异常层进行完全控制。例如，你可能希望添加日志记录或根据某些动态因素使用不同的 JSON 架构。**异常过滤器**正是为此目的而设计的。它允许你控制确切的控制流以及发送回客户端的响应内容。

让我们创建一个异常过滤器，负责捕获作为`HttpException`类实例的异常，并为它们实现自定义响应逻辑。为此，我们需要访问底层平台`Request`和`Response`对象。我们将访问`Request`对象，以便我们可以提取原始`url` 并将其包含在日志记录信息中。我们将使用 `Response` 对象来直接控制发送的响应，使用 `response.json()` 方法。

```jsx title="http-exception.filter" showLineNumbers
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
```

:::tip 提示
所有异常过滤器都应实现通用的`ExceptionFilter<T>`接口。这要求您提供`catch(exception: T, host: ArgumentsHost)` 方法及其指示的签名。“T”表示异常的类型。
:::

:::caution 警告
如果您使用的是`@nestjs/platform-fastify`，则可以使用`response.send()`而不是`response.json()`。不要忘记从`fastify`导入正确的类型。
:::

`@Catch(HttpException)`装饰器将所需的元数据绑定到异常过滤器，告诉 Nest 此特定过滤器正在查找类型为`HttpException`的异常，而不是其他任何异常。`@Catch()`装饰器可以采用单个参数或逗号分隔的列表。这使您可以一次为多种类型的异常设置过滤器。

### 参数 host

让我们看看 `catch()` 方法的参数。`exception` 参数是当前正在处理的异常对象。`host` 参数是一个`ArgumentsHost` 对象。`ArgumentsHost`是一个功能强大的实用程序对象，我们将在 [执行上下文章节]中进一步研究它。在此代码示例中，我们使用它来获取对传递给原始请求处理程序（在异常发生控制器中的）的`Request` 和 `Response`对象的引用。在此代码示例中，我们在`ArgumentsHost`上使用了一些帮助程序方法来获取所需的`Request` 和 `Response`对象。了解更多关于`ArgumentsHost` [这里]。

这种抽象级别的原因是`ArgumentsHost`在所有上下文中都起作用（例如，我们现在正在使用的 HTTP 服务器上下文，以及微服务和 WebSockets）。在`执行上下文`章节中，我们将看到如何使用`ArgumentsHost`及[其帮助程序函数的强大功能访问](https://docs.nestjs.com/fundamentals/execution-context#host-methods”)执行上下文的适当基础参数。这将允许我们编写在所有上下文中运行的通用异常过滤器。

### 绑定过滤器

让我们将 `HttpExceptionFilter` 绑定到 `CatsController` 的 `create()` 方法上。

```jsx title="cats.controller"  showLineNumbers
@Post()
@UseFilters(new HttpExceptionFilter())
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```

:::tip 信息
`@UseFilters()`装饰器，来自包`@nestjs/common`
:::

我们在这里使用了`@UseFilters()`装饰器。与`@Catch()`装饰器类似，它可以采用单个过滤器实例或逗号分隔的过滤器实例列表。在这里，我们就地创建了`HttpExceptionFilter`的实例。或者，您可以传递类（而不是实例），将实例化的责任留给框架，并启用 **依赖关系注入**。

```jsx title="cats.controller"  showLineNumbers
@Post()
@UseFilters(HttpExceptionFilter)
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```

:::tip 提示
如果可能，最好使用类而不是实例来应用过滤器。它减少了内存使用量，因为 Nest 可以轻松地在整个模块中重用同一类的实例。
:::

在上面的示例中，`HttpExceptionFilter`仅应用于单个`create()`方法上的，使其成为`方法范围`。异常过滤器的作用域可以位于不同的级别：`方法`、`控制器`或`全局`。例如，若要将过滤器设置为`控制器范围`，请执行以下操作：

```jsx {1} title="cats.controller"  showLineNumbers
@UseFilters(new HttpExceptionFilter())
export class CatsController {}
```

此构造为`CatsController`中定义的每个路由处理程序设置`HttpExceptionFilter`。

若要创建全局范围的过滤器，请执行以下操作：

```jsx {3} title="main"  showLineNumbers
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

:::caution 警告
`useGlobalFilters()`方法不会为网关或混合应用程序设置过滤器。
:::

全局范围的过滤器用于整个应用程序，用于每个控制器和每个路由处理程序。在依赖注入方面，从任何模块外部注册的全局过滤器（如上例所示使用 `useGlobalFilters()` ）无法注入依赖关系，因为这是在任何模块的上下文之外完成的。为了解决此问题，您可以使用以下结构直接从任何模块注册一个全局范围的过滤器：

```jsx {5-9} title="app.module"  showLineNumbers
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```

:::tip 提示
当使用这种方法为过滤器执行依赖注入时，请注意，无论采用这种构造的模块如何，过滤器实际上都是全局的。这应该在哪里完成？选择定义过滤器（HttpExceptionFilter 在上面的示例中）的模块。此外，useClass 这不是处理自定义提供程序注册的唯一方法。在这里了解更多。
:::

您可以根据需要使用此技术添加任意数量的过滤器；只需将每个添加到提供程序数组即可。

### 抓住一切

为了捕获每个未处理的异常（无论异常类型如何），将@Catch()装饰器的参数列表留空，例如@Catch().

在下面的示例中，我们有一个与平台无关的代码，因为它使用 HTTP 适配器来传递响应，并且不直接使用任何特定于平台的对象（Request 和 Response）：

```jsx showLineNumbers
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
```

:::caution 警告
将捕获所有内容的异常过滤器与绑定到特定类型的过滤器组合时，应首先声明“捕获任何内容”过滤器，以允许特定过滤器正确处理绑定类型。
:::

### 继承

通常，您将创建完全定制的异常过滤器来满足您的应用程序需求。但是，当您希望简单地扩展内置的默认全局异常过滤器并根据某些因素覆盖行为时，可能会有一些用例。

为了将异常处理委托给基本过滤器，您需要扩展`BaseExceptionFilter`并调用继承的`catch()`方法。

```jsx {4-9} title="all-exceptions.filter"  showLineNumbers
import { Catch, ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
```

:::caution 警告
扩展的方法作用域和控制器作用域的过滤器 BaseExceptionFilter 不应使用实例化 new。相反，让框架自动实例化它们。
:::

上面的实现只是一个演示方法的 shell。您对扩展异常过滤器的实现将包括您定制的业务逻辑（例如，处理各种条件）。

全局过滤器可以扩展基本过滤器。这可以通过两种方式之一完成。

第一种方法是 `HttpAdapter` 在实例化自定义全局过滤器时注入引用：

```jsx
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
```

第二种方法是使用此处所示 `APP_FILTER` 的令牌。
