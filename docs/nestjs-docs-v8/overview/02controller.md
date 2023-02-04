---
sidebar_label: 控制器
sidebar_position: 2
hide_title: true
---
### Controller 控制器
控制器负责处理传入的请求并向客户返回响应。

![来自静态目录的图像](../../images/nestjs-docs-v8/overview/Controllers_1.png)

一个控制器的目的是接收应用程序的特定请求。路由机制控制哪个控制器接收哪些请求。通常，每个控制器有一个以上的路由，不同的路由可以执行不同的动作。

为了创建一个基本的控制器，我们使用类和装饰器。装饰器将类与所需的元数据联系起来，并使Nest能够创建一个路由图（将请求绑定到相应的控制器）。

:::tip
为了快速创建一个内置验证的CRUD控制器，你可以使用CLI的CRUD生成器：`nest g resource [name]`。
::: 

### 路由
在下面的例子中，我们将使用`@Controller()`装饰器，这是定义一个基本控制器所需要的。我们将指定一个可选的路由路径前缀为`cats`。在`@Controller()`装饰器中使用路径前缀，可以让我们轻松地将一组相关的路由分组，并尽量减少重复的代码。例如，我们可以选择将一组管理与客户实体互动的路由归入路由`/customers`。在这种情况下，我们可以在`@Controller()`装饰器中指定路径前缀`customers`，这样我们就不必为文件中的每个路由重复这部分的路径。

```jsx title="cats.controller.ts"
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

:::tip
要使用CLI创建一个控制器，只需执行`$ nest g controller cats`命令。
::: 

`findAll()`方法之前的`@Get()` HTTP请求方法装饰器，告诉Nest为HTTP请求的特定端点创建一个处理程序。端点与HTTP请求方法（本例中为GET）和路由路径相对应。

什么是路由路径？处理程序的路径是通过连接控制器声明`@Controller('cats')`中的`cats`，以及方法装饰器`@Get()`中指定的任何路径来确定的。由于我们已经为每个路由（cats）声明了一个前缀，并且没有在装饰器`@Get()`中添加任何路径信息，Nest就会将`GET /cats`请求映射到`findAll()的Get方法`上来。

如前所述，路径包括`@Controller()`路径前缀和请求方法`findAll()`装饰器`@Get()`中配置的路径。例如，`@Controller('customers')`的路径前缀与装饰器`@Get('profile')`相结合，将产生一个`GET /customers/profile`这样的路由映射请求。

在我们上面的例子中，当向该端点发出GET请求时，Nest将该请求路由到我们用户定义的findAll()方法。注意，我们在这里选择的方法名称是完全任意的。显然，我们必须声明一个方法来绑定路由，但Nest并不重视所选择的方法名称的任何意义。

这个方法将返回一个200状态代码和相关的响应，在这种情况下，它只是一个字符串。为什么会发生这种情况？为了解释，我们首先要介绍一个概念，即Nest采用了两种不同的选项来操作响应。

| 选项                        | 描述                            |
| -------------------------- | ------------------------------ |
| `Standard (recommended)`        | 使用这种内置方法，当请求处理程序返回一个JavaScript对象或数组时，它将自动被序列化为JSON。然而，当它返回一个JavaScript原始类型（例如，字符串、数字、布尔值）时，Nest将只发送值，而不尝试对其进行序列化。这使得响应处理变得简单：只需返回值，Nest就会处理其余的事情。此外，响应的状态代码默认总是200，除了使用201的POST请求。我们可以通过在处理程序级别添加@HttpCode(...)装饰器来轻松改变这一行为（见状态代码）。      |
| `Library-specific`   | 我们可以使用库特定的（例如Express）响应对象，它可以使用方法处理签名中的@Res()装饰器注入（例如findAll(@Res() response)）。通过这种方法，你有能力使用该对象所暴露的本地响应处理方法。例如，在Express中，你可以使用response.status(200).send()这样的代码来构造响应。       |

:::caution
 NEST会检测处理程序是否使用@Res()或@Next()，表明你选择了库的特定选项。如果同时使用这两种方法，标准方法将自动禁用于该单一路由，并不再按预期工作。要同时使用这两种方法（例如，通过注入响应对象只设置cookie/头文件，但仍将其余部分留给框架），你必须在@Res({ passthrough: true })装饰器中将passthrough选项设置为true。
:::  

### 请求对象
处理程序经常需要访问客户端的请求细节。Nest提供了对底层平台（默认为Express）的请求对象的访问。我们可以通过在处理程序的签名中添加@Req()装饰器来指示Nest注入请求对象来访问它。

```jsx title="cats.controller.ts"
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```

:::tip
为了利用表达式类型的优势（如上面的request: Request参数的例子），请安装@types/express包。
::: 

请求对象代表了HTTP请求，并有请求查询字符串、参数、HTTP头和正文的属性[`（在此阅读更多内容）`](https://expressjs.com/en/api.html#req)。在大多数情况下，没有必要手动抓取这些属性。我们可以使用专门的装饰器来代替，比如`@Body()`或`@Query()`，这些装饰器开箱即用。下面是一个所提供的装饰器的列表，以及它们所代表的普通平台特定对象。

| 装饰器                      | 特定对象                            |
| -------------------------- | ------------------------------ |
| `@Request(), @Req()`        | req      |
| `@Response(), @Res()*`        | res      |
| `@Next()`        | next      |
| `@Session()`        | req.session      |
| `@Param(key?: string)`        | req.params / req.params[key]      |
| `@Body(key?: string)`        | req.body / req.body[key]      |
| `@Query(key?: string)`        | req.query / req.query[key]     |
| `@Headers(name?: string)`        | req.headers / req.headers[name]      |
| `@Ip()`        | req.ip    |
| `@HostParam()`        | req.hosts    |

* 为了与跨底层HTTP平台（例如`Express`和`Fastify`）的类型兼容，Nest提供了`@Res()`和`@Response()`装饰器。`@Res() `是 `@Response()` 的简单别名。两者都直接暴露了底层的本地平台响应对象接口。当使用它们时，你也应该导入底层库的类型（例如，`@types/express`）以充分利用。请注意，当你在方法处理程序中注入`@Res()`或`@Response()`时，你将Nest放入该处理程序的库特定模式中，并且你将负责管理响应。当这样做时，你必须通过调用响应对象（如 `res.json(...)` 或 `res.send(...)`）来发出某种响应，否则 HTTP 服务器会挂起。

:::tip
如何定义自己的装饰器，请学习[`这个章节`](https://docs.nestjs.com/v8/custom-decorators)
::: 

### 资源
早些时候，我们定义了一个方法来获取`cats`的资源（GET路由）。我们通常也想提供一个创建新记录的方法。为此，让我们创建一个POST方法。

```jsx title="cats.controller.ts"
import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

就是这么简单。Nest为所有的标准HTTP方法提供装饰器。 `@Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), 和 @Head()`。此外，`@All()`定义了一个可以处理所有这些方法的端点。

### 路由通配符
基于路由的模式也被支持。例如，`*`被用作通配符，将匹配任何字符的组合。

```ts
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
```

`ab*cd` 路由路径将匹配abcd、ab_cd、abecd，等等。字符"？"、"+"、"*"和"（）"可以在路径中使用，它们是对应于正则表达式的子集。连字符(-)和点(.)可以通过基于字符串的路径进行字面解释。

### 状态代码
如前所述，响应状态代码默认总是200，除了POST请求是201。我们可以通过在处理程序级别添加`@HttpCode(...)`装饰器来轻松改变这一行为。

```ts
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```
:::tip
从`@nestjs/common`包导入`HttpCode`
::: 

通常，你的状态代码不是静态的，而是取决于各种因素。在这种情况下，你可以使用一个库特定的响应（使用@Res()注入）对象（或者，在出现错误时，抛出一个异常）。
	
### 头信息
要指定一个自定义的响应头，你可以使用`@Header()`装饰器或一个库特定的响应对象（并直接调用`res.header()`）。
	
```ts
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

:::tip
从`@nestjs/common`包导入`Header`
::: 

### 重定向
要将一个响应重定向到一个特定的URL，你可以使用`@Redirect()`装饰器或一个库特定的响应对象（并直接调用`res.redirect()`）。
`@Redirect()`需要两个参数，`url`和`statusCode`，都是可选的。如果省略的话，`statusCode`的默认值是`302`。

```ts
@Get()
@Redirect('https://nestjs.com', 301)
```
有时你可能想动态地确定HTTP状态代码或重定向URL。通过从路由处理方法中返回一个对象来做到这一点，类似如下。
```json
{
  "url": string,
  "statusCode": number
}
```
返回的值将覆盖传递给@Redirect()装饰器的任何参数。比如说。
```ts
@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}
```

### 路由参数
当你需要接受动态数据作为请求的一部分时，带有静态路径的路由将无法工作（例如，GET /cats/1以获得id为1的猫）。为了定义带参数的路由，我们可以在路由的路径中添加路由参数令牌，以捕获请求URL中该位置的动态值。下面@Get()装饰器例子中的路由参数令牌展示了这种用法。以这种方式声明的路由参数可以使用@Param()装饰器进行访问，它应该被添加到方法签名中。

```ts
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

`@Param()`被用来装饰一个方法参数（上面例子中的`params`），并使路由参数作为该方法主体中被装饰的方法参数的属性可用。正如上面的代码所见，我们可以通过引用`params.id`来访问`id参数`。你也可以向装饰器传递一个特定的参数标记，然后在方法主体中直接引用路由参数的名称。

:::tip
从`@nestjs/common`包导入`Param`
::: 

```ts
@Get(':id')
findOne(@Param('id') id: string): string {
  return `This action returns a #${id} cat`;
}
```

### 子域路由
`@Controller`装饰器可以接受一个`host`选项，要求传入的请求的HTTP主机与某些特定的值相匹配。
```ts
@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
```

:::caution
由于Fastify缺乏对嵌套路由器的支持，当使用子域路由时，应该使用（默认）Express适配器来代替
:::

与路由路径类似，`hosts选项`可以使用令牌来捕获主机名称中该位置的动态值。下面`@Controller()`装饰器例子中的主机参数令牌展示了这种用法。以这种方式声明的主机参数可以使用`@HostParam()`装饰器进行访问，它应该被添加到方法签名中。

```ts
@Controller({ host: ':account.example.com' })
export class AccountController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}
```

### 范畴
对于来自不同编程语言背景的人来说，要知道在Nest中，几乎所有的东西都是在传入的请求中共享的，这可能是意想不到的。我们有一个到数据库的连接池，有全局状态的单体服务，等等。请记住，Node.js并不遵循请求/响应的多线程无状态模型，其中每个请求都由一个单独的线程来处理。因此，使用单体实例对我们的应用程序是完全安全的。

但是，在极端情况下，基于请求的控制器生存周祁可能是所需的行为（However, there are edge-cases when request-based lifetime of the controller may be the desired behavior），例如GraphQL应用程序中的每个请求缓存，请求跟踪或多租户。在这里了解如何[`控制作用域`](https://docs.nestjs.com/v8/fundamentals/injection-scopes)。

### 异步性
我们热爱现代JavaScript，我们知道数据提取大多是异步的。这就是为什么Nest支持并能很好地使用异步函数。
:::tip
学习` async / await`[`请点击这里`](https://kamilmysliwiec.com/typescript-2-1-introduction-async-await)
:::

每个异步函数都必须返回一个Promise。这意味着你可以返回一个延迟值，Nest将能够自己解决。让我们来看看这个例子。

```jsx title="cats.controller.ts"
@Get()
async findAll(): Promise<any[]> {
  return [];
}
```

上述代码是完全有效的。此外，Nest路由处理程序通过能够返回RxJS可观察流而变得更加强大。Nest 将自动订阅下面的源并获取最后一个发出的值（一旦流完成）--（ Nest will automatically subscribe to the source underneath and take the last emitted value (once the stream is completed)）

```jsx title="cats.controller.ts"
@Get()
findAll(): Observable<any[]> {
  return of([]);
}
```

上述两种方法都有效，你可以使用任何符合你要求的方法。

### 请求的有效载荷
我们之前的POST路由处理器的例子没有接受任何客户端参数。让我们通过在这里添加`@Body()`装饰器来解决这个问题。

但首先（如果你使用TypeScript），我们需要确定DTO（数据传输对象）模式。DTO是一个定义了数据如何在网络上发送的对象。我们可以通过使用TypeScript接口，或通过简单的类来确定DTO模式。有趣的是，我们在这里推荐使用类。为什么呢？类是JavaScript ES6标准的一部分，因此它们在编译后的JavaScript中被保留为真实的实体。另一方面，由于TypeScript接口在转译过程中被移除，Nest不能在运行时引用它们。这一点很重要，因为像管道这样的功能在运行时可以访问变量的元类型，从而实现更多的可能性。

我们来创建`CreateCatDto`类。
```jsx title="create-cat.dto.ts"
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```
它只有三个基本属性。此后我们可以在`CatsController`中使用新创建的`DTO`。

:::tip
我们的Validation Pipe可以过滤掉那些不应该被方法处理程序接收的属性。在这种情况下，我们可以将可接受的属性列入白名单，任何不包括在白名单中的属性都会自动从结果对象中剥离。在`CreateCatDto`的例子中，我们的白名单是`名称、年龄和品种属性`。[`在这里了解更多。`](https://docs.nestjs.com/techniques/validation#stripping-properties)
:::

### 处理错误
这里有一个关于处理错误的单独章节（即，与异常一起工作）。

### 完整例子#
下面是一个例子，利用几个可用的装饰器来创建一个基本的控制器。这个控制器暴露了一些方法来访问和操作内部数据。
```jsx title="cats.controller.ts"
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
```

:::tip
Nest CLI提供了一个自动生成器（示意图），自动生成所有的模板代码，以帮助我们避免做这些事情，并使开发人员的体验更加简单。在这里阅读更多关于[`这个功能的信息`](https://docs.nestjs.com/v8/recipes/crud-generator)。
:::

### 开始运行
随着上述控制器的完全定义，Nest仍然不知道`CatsController`的存在，因此不会创建这个类的实例。

控制器总是属于一个模块，这就是为什么我们在`@Module()`装饰器中包含控制器数组。由于我们还没有定义任何其他模块，除了根`AppModule`，我们将用它来介绍`CatsController`。

```jsx title="app.module.ts"
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```
我们使用`@Module()`装饰器将元数据附加到模块类，Nest现在可以很容易地反映出哪些控制器必须被安装。

### 库的特定方法
到目前为止，我们已经讨论了操作响应的Nest标准方式。操作响应的第二种方式是使用库特定的响应对象。为了注入一个特定的响应对象，我们需要使用 `@Res()` 装饰器。为了显示差异，让我们把`CatsController`重写成以下内容。

```jsx title="CatsController.ts"
import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
     res.status(HttpStatus.OK).json([]);
  }
}
```

虽然这种方法是可行的，而且事实上通过提供对响应对象的完全控制，在某些方面确实有更大的灵活性（头文件的操作、库的特定功能等等），但是应该谨慎使用。一般来说，这种方法不那么明确，而且确实有一些缺点。主要的缺点是，你的代码变得依赖于平台（因为底层库在响应对象上可能有不同的API），而且更难测试（你必须模拟响应对象，等等）。

另外，在上面的例子中，你失去了与依赖Nest标准响应处理的Nest功能的兼容性，如拦截器和@HttpCode() / @Header() 装饰器。为了解决这个问题，你可以将passthrough选项设置为true，如下所示。

```ts
@Get()
findAll(@Res({ passthrough: true }) res: Response) {
  res.status(HttpStatus.OK);
  return [];
}
```

现在，你可以与本地响应对象进行交互（例如，根据某些条件设置cookies或头信息），但把其余的事情留给框架。