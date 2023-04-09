---
sidebar_label: 守卫
title: 守卫
sidebar_position: 8
hide_title: true
description: nestjs的守卫 翻译
keywords:
  [
    nestjs,
    guards,
    管道,
    zhouxiaoxiao,
    CanActivate,
    ExecutionContext,
    authorization,
    authenticated,
  ]
---

:::info
本文翻译自官网文档 v9:[https://docs.nestjs.com/](https://docs.nestjs.com/)

大家一起交流学习Nestjs React全栈技术，QQ群：298304381
:::

### 守卫

带上装饰器 `@Injectable()` 并实现了 `CanActivate` 接口的类，就是守卫。

![来自静态目录的图像](../../images/nestjs-docs-v9/overview/Guards_1.png)

守护只做一件事情。他们根据运行时的某些条件（如权限、角色、ACL等）来决定一个给定的请求是否会被路由处理程序处理。这通常被称为授权。在传统的Express应用程序中，授权、认证通常由中间件处理。中间件对于认证来说是一个很好的选择，因为像令牌验证和为请求对象附加属性这样的事情与特定的路由上下文（及其元数据）没有紧密联系。

但是，中间件存在天然缺陷。它不知道在调用next()函数后，哪个处理程序将被执行。另一方面，守卫可以访问 ExecutionContext 实例，因此知道下一步将执行什么。它们的设计很像异常过滤器、管道和拦截器，可以让你在请求/响应周期中的正确位置插入处理逻辑，而且是以声明的方式进行。

:::tip 提示
守护在所有中间件之后执行，但在任何拦截器或管道之前。
:::

### 授权守卫

如前所述，授权是守卫的典型的使用案例，因为只有当调用者（通常是一个特定的认证用户）有足够的权限时，特定的路由才能使用。下面代码里面的 `AuthGuard` 假定有一个经过认证的用户（因此，在请求头文件中附有一个令牌）。它将提取并验证令牌，并使用提取的信息来确定请求是否可以继续。

```jsx showLineNumbers title='auth.guard.ts'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

:::tip 提示
如果你正在寻找一个关于如何在你的应用程序中实现认证机制的真实[案例](https://docs.nestjs.com/security/authentication)，请访问本章。同样，对于更复杂的授权例子，请查看[本页面](https://docs.nestjs.com/security/authorization)。
:::

validateRequest()函数内部的逻辑可以根据需要简单或复杂。这个例子的重点是展示守卫是如何融入请求/响应周期的。

每个守卫都必须实现一个canActivate()函数。这个函数应该返回一个布尔值，表明当前的请求是否被允许。它可以同步或异步地返回响应（通过Promise或Observable）。Nest使用返回值来控制下一个动作：

```text 
如果它返回true，该请求将被处理。
如果它返回false，Nest将拒绝该请求。
```

### 执行上下文

canActivate()函数需要一个参数，即ExecutionContext(执行上下文)实例。ExecutionContext 继承自 ArgumentsHost。我们之前在异常过滤器一章中看到了ArgumentsHost。在上面的例子中，我们只是使用了定义在ArgumentsHost上的相同的辅助方法，我们先前使用了这些方法，以获得对Request对象的引用。你可以参考异常过滤器一章中的Arguments host部分，了解更多关于这个主题的内容。

通过扩展ArgumentsHost，ExecutionContext还增加了几个新的辅助方法，提供关于当前执行过程的额外细节。这些细节有助于构建更多的通用守护，这些守护可以在广泛的控制器、方法和执行上下文中工作。在[这里](https://docs.nestjs.com/fundamentals/execution-context)了解更多关于ExecutionContex的信息。

### 基于角色的认证

让我们建立一个功能更强的守卫，只允许具有特定角色的用户访问。我们将从一个基本的守卫开始，并在接下来的章节中对其进行构建。现在，它允许所有请求继续进行：

```jsx showLineNumbers title='roles.guard.ts'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```

### 绑定守卫

像管道和异常过滤器一样，守护可以作用在控制器上，方法上，或者全局的。下面，我们使用@UseGuards()装饰器设置了一个控制器上的守卫。这个装饰器可以接受一个单独的参数，或者一个逗号分隔的参数列表。这让你可以通过一个声明轻松地应用适当的守卫集。

```jsx showLineNumbers
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {}
```

:::tip 提示
@UseGuards() 装饰器是从 @nestjs/common 包中导入的。
:::

上面，我们传递了RolesGuard类（而不是一个实例），将实例化的责任留给了框架，并实现了依赖性注入。与管道和异常过滤器一样，我们也可以传递一个新的实例：

```jsx showLineNumbers
@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {}
```

上面的代码处理的时候会将守卫附加到这个控制器所声明的每个处理程序上。如果我们希望守卫只适用于一个方法，我们可以在方法层应用@UseGuards() 装饰器。

为了设置全局守卫，使用Nest应用程序实例的useGlobalGuards()方法：

```jsx showLineNumbers
const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new RolesGuard());
```

:::caution NOTICE
对于混合型应用程序，useGlobalGuards()方法默认不为网关和微服务设置守卫（关于如何改变这一行为的信息，请参见混合型应用程序）。对于 "标准"（非混合型）微服务应用程序，useGlobalGuards()确实在全局范围内安装防护。(译者注：这里和pipes里面的一样的)
:::

全局守卫在整个应用程序中会作用在每个控制器和每个路由处理程序。在依赖注入方面，从任何模块之外注册的全局守卫（如上面的例子中使用useGlobalGuards()）不能注入依赖，因为这是在任何模块的上下文之外进行的。为了解决这个问题，你可以使用下面的方式直接从任何模块中设置一个守卫：(译者注：就是上面直接在app注册的守卫，module是引用不到的)

```jsx showLineNumbers title='app.module.ts'
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
```

:::tip 提示
当使用这种方法为守卫进行依赖性注入时，请注意，无论在哪个模块采用这种方式，守卫实际上都是全局性的。这应该在哪里进行呢？选择定义了防护（上面例子中的RolesGuard）的模块。另外，useClass并不是处理自定义提供者注册的唯一方法。在[这里](https://docs.nestjs.com/fundamentals/custom-providers)了解更多。
:::

我们的RolesGuard可以工作了，但是它还不够聪明。我们还没有利用最重要的守卫特性--执行上下文。它还不知道角色，或者每个处理程序允许哪些角色。例如，CatsController可以为不同的路线提供不同的权限方案。有些可能只对管理员用户开放，而有些可能对所有人开放。我们怎样才能以一种灵活和可重用的方式将角色与路由相匹配呢？

这就是自定义元数据发挥作用的地方（在[这里](https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata)了解更多）。Nest提供了通过@SetMetadata()装饰器将自定义元数据附加到路由处理程序的能力。这个元数据提供了我们缺失的角色数据，智能守卫需要这些数据来做出决定。让我们来看看如何使用@SetMetadata()：

```jsx showLineNumbers title='cats.controller.ts'
@Post()
@SetMetadata('roles', ['admin'])
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

:::tip 提示
@SetMetadata()装饰器是从@nestjs/common包中导入的。
:::

通过上面的结构，我们将角色元数据（角色是一个key，而['admin']是一个特定的value）附加到create()方法中。虽然这很有效，但在你的路由中直接使用@SetMetadata()并不是好的做法。相反，创建你自己的装饰器，如下所示：

```jsx showLineNumbers title='roles.decorator.ts'
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

这种方法更简洁、更易读，而且是强类型的。现在我们有一个自定义的@Roles()装饰器，我们可以用它来装饰create()方法。

```jsx showLineNumbers title='cats.controller.ts'
@Post()
@Roles('admin')
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

### 完善RolesGuard

现在让我们把 RolesGuard 功能完善起来。目前，它在所有情况下都简单地返回true，允许每个请求继续进行。我们想在比较分配给当前用户的角色和当前正在处理的路由所要求的实际角色的基础上，使返回值成为条件。为了访问路由的角色（自定义元数据），我们将使用Reflector帮助类，它是由框架提供的，并可以从@nestjs/core包中导入。

```jsx showLineNumbers title='roles.guard.ts'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.roles);
  }
}
```

:::tip 提示
在node.js世界中，通常的做法是将授权用户附加到请求对象中。因此，在我们上面的示例代码中，我们假设 request.user 包含用户实例和允许的角色。在你的应用程序中，你可能会在你的自定义认证防护（或中间件）中进行这种关联。请查看本章以了解有关这一主题的更多信息。
:::

:::caution WARNING
matchRoles()函数内部的逻辑可以根据需要简单或复杂。这个例子的重点是展示守卫如何融入请求/响应周期。
:::

请参考[执行上下文章节的反射和元数据部分](https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata)，了解以上下文敏感的方式利用反射器的更多细节。

当权限不足的用户请求一个端点时，Nest自动返回以下响应：

```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

请注意，当一个守卫返回错误时，Nestjs框架会抛出一个ForbiddenException。如果你想返回一个不同的错误响应，你应该抛出你自己的特定异常。比如说：

```jsx
throw new UnauthorizedException();
```

由守卫装置抛出的任何异常将由异常层（全局异常过滤器和应用于当前上下文的任何异常过滤器）处理。

如果你正在寻找一个关于如何实现授权的真实例子，请查看[本章](https://docs.nestjs.com/security/authorization)。

### 总结

本章节主要内容如下：

守卫的主要职责。

守卫的重要特性ExecutionContext(执行上下文)。

守卫的作用范围。

如何建立基于角色的守卫。

利用装饰器封装守卫。

注意本章节代码只是演示代码，文中有具体例子的链接。
