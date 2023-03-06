---
sidebar_label: 中间件
title: 中间件
sidebar_position: 5
hide_title: true
---

### 中间件

中间件是一个在路由处理程序之前被调用的函数。中间件函数可以访问[`请求`](https://expressjs.com/en/4x/api.html#req)和[`响应`](https://expressjs.com/en/4x/api.html#res)对象，以及应用程序的请求-响应周期中的`next()`中间件函数。下一个中间件函数通常由一个名为`next`的变量来表示。

![来自静态目录的图像](../../images/nestjs-docs-v9/overview/Middlewares_1.png)

Nest中间件在默认情况下等同于[`Express`](https://expressjs.com/en/guide/using-middleware.html)中间件。下面是来自官方express文档的描述，描述了中间件的能力。

```text
中间件函数可以执行以下任务：
1、执行任何代码。
2、对请求和响应对象进行更改。
3、结束请求-响应周期。
4、调用堆栈中的下一个中间件函数。
5、如果当前中间件函数没有结束请求-响应周期，则必须调用`next()`将控制权传递给下一个中间件函数。
   否则，请求将保持挂起状态。
```

你可以在一个函数中实现自定义Nest中间件，或者在一个带有`@Injectable()`装饰器的类中实现。类应该实现`NestMiddleware`接口，而函数则没有任何特殊要求。让我们先用类的方法实现一个简单的中间件功能。

```jsx {4-5} showLineNumbers title="logger.middleware"
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

### 依赖注入

Nest中间件完全支持依赖性注入。就像提供者和控制器一样，它们能够注入同一模块内可用的依赖关系。像往常一样，这是通过`构造函数`完成的。



### 应用中间件

在`@Module()`装饰器中没有中间件的参数位置。所以，我们使用模块类的`configure()`方法来设置它们。包含中间件的模块必须实现`NestModule`接口。让我们在`AppModule`级别设置`LoggerMiddleware`。

```jsx {8-13} showLineNumbers title="app.module"
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
```

在上面的例子中，我们已经为之前在`CatsController`中定义的`/cats`路由处理程序设置了`LoggerMiddleware`。在配置中间件时，我们还可以通过向`forRoutes()`方法传递一个包含路由路径和请求方法的对象来进一步将中间件限制在一个特定的请求方法上。在下面的例子中，注意到我们导入了`RequestMethod`枚举来引用所需的请求方法类型。

```jsx {8-13} showLineNumbers title="app.module"
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
```

:::tip 提示
configure()方法可以使用async/await进行异步操作（例如，你可以在configure()方法主体内等待一个异步操作的完成）。
:::

:::caution 警告
当使用`Express`适配器时，`NestJS`应用程序将默认从包的`body-parser`注册json和urlencoded。这意味着如果你想通过`MiddlewareConsumer`定制该中间件，你需要在用`NestFactory.create()`创建应用程序时将`bodyParser`标志设置为`false`，从而关闭全局中间件。
:::

### 路由通配符

也支持基于模式的路由。例如，星号被用作通配符，将匹配任何字符的组合:

```jsx
forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
```

`'ab*cd'` 路由路径将匹配abcd、ab_cd、abecd，等等。字符"？"、"+"、"*"和"（）"可以在路径中使用，它们是对应于正则表达式的子集。连字符(-)和点(.)可以通过基于字符串的路径进行字面解释。

### 中间件消费者

`MiddlewareConsumer`是一个辅助类。它提供了几种内置方法来管理中间件。所有这些都可以简单地以[Fluent styple](https://en.wikipedia.org/wiki/Fluent_interface)。`forRoutes()`方法可以采用单个字符串、多个字符串、`RouteInfo`对象、一个控制器类甚至多个控制器类。在大多数情况下，你可能只会传递一个以逗号分隔的控制器列表。下面是单个控制器的示例：
```jsx {9-13} showLineNumbers title="app.module"
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController);
  }
}
```

:::tip 提示
该 `apply()` 方法可以使用单个中间件，也可以使用多个参数来指定多个**多个中间件**。
:::

### 路由排除

有时我们希望从应用中间件中排除某些路由。我们可以使用 `exclude()` 方法轻松排除某些路由。此方法可以采用单个字符串、多个字符串或标识要排除的路由的 `RouteInfo` 对象，如下所示：

```jsx
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)',
  )
  .forRoutes(CatsController);
```

:::tip 提示
`exclude()` 方法支持使用[`正则表达式`](https://github.com/pillarjs/path-to-regexp#parameters)包路径的通配符参数。
:::

在上面的例子中，`LoggerMiddleware`将被绑定到 `CatsController` 中定义的所有路由，除了传递给 `exclude()` 方法的三个路由。


### 函数式中间件

我们一直在使用的`LoggerMiddleware`类非常简单。它没有成员，没有其他方法，也没有依赖项。为什么我们不能在一个简单的函数而不是类中定义它？事实上，我们可以。这种类型的中间件称为`函数式间件`。让我们将`LoggerMiddleware`中间件从基于类的中间件转换为函数式间件，以说明其中的区别：

```jsx title="logger.middleware"
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};
```

在`AppModule`中使用它：

```jsx title="app.module"
consumer
  .apply(logger)
  .forRoutes(CatsController);
```

:::tip 提示
只要中间件不需要任何依赖项，请考虑使用更简单的 `函数式中间件` 替代方法。
:::

### 多个中间件

如上所述，为了绑定多个按顺序执行的中间件，只需在 'apply（）' 方法中提供一个逗号分隔的列表：

```jsx
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

### 全局中间件

如果我们想一次将中间件绑定到每个注册的路由，我们可以使用`INestApplication` 实例提供的 `use（）`方法：

```jsx title="main"
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

:::tip 提示
无法访问全局中间件中的 DI 容器。当使用`app.use()` 时，您可以使用[函数式中间件]（中间件#functional-middleware）代替。或者，您可以使用类中间件并将其与`AppModule`或任何其他模块）中的`.forRoutes（”*“）`一起使用。
:::
