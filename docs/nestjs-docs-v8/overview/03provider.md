---
sidebar_label: 提供者
sidebar_position: 3
hide_title: true
---

### 提供者(Providers)
 `Providers`在Nest中是一个基础性的概念。许多Nest基类都被认为是provider，`services`, `repositories`, `factories`, `helpers`等等`(译者注：这里更愿意理解为组件-Component)`。提供者(组件)可以通过依赖关系直接进行注入，因此各个对象之间可以建立复杂的关系，并且这种复杂的关系是委托给Nest运行时系统进行管理的。提供者是一个我们使用装饰器@Injectable()进行注解的类。

![来自静态目录的图像](../../images/nestjs-docs-v8/overview/Components_1.png)

在上一章中，我们构建了一个简单的 CatsController。控制器应处理 HTTP 请求并将更复杂的任务委托给提供程序。Providers是在模块中声明为提供程序的纯 JavaScript 类。

:::tip 提示
由于 Nest 能够以更面向对象的方式设计和组织依赖项，因此我们强烈建议遵循[SOLID](https://en.wikipedia.org/wiki/SOLID) 原则
:::

### 服务(Services) 
让我们从一个简单`CatsService`开始。该服务将负责数据存储和检索，其将被`CatsController`进行调用，因此可以把它定义为`Provider`，所以在`Service`类上需要进行一个`@Injectable()`的声明。

```jsx title="cats.service"
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

:::info 提示
新增`Service`类可以使用`CLI`，执行`$ nest g service cats`命令即可
:::

`CatsService`是一个简单的类，拥有一个属性和两个方法。唯一新特性是它使用了`@Injectable()`装饰器。被`@Injectable()`装饰后`CatsService`类就可以被[Nest IoC容器](https://en.wikipedia.org/wiki/Inversion_of_control)识别并对其进行管理。另外我们使用一个`Cat`接口，其代码如下：

```jsx title="cat.interface"
export interface Cat {
  name: string;
  age: number;
  breed: string;
}
```

现在我们有一个`CatsService`类来检索`cat`，让我们在`CatsController`里调用它：

```jsx title="cats.controller"
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

`CatsService`类是通过构造器进行注入的。注意`private`语法，表明我们在同一地方声明并初始化了`catsService`类。

### 依赖注入(Dependency injection) 
Nest 是围绕`依赖注入`这个强大的设计模式而构建的。我们建议在官方的 [Angular文档](https://angular.io/guide/dependency-injection) 中阅读有关此概念的相关文档。

在`Nest`中，借助`TypeScript`功能特性，使得管理依赖非常容易，因为它们仅按类型进行解析。在下面的示例中，`Nest`将通过创建和返回`CatsService`的实例来解析`catsService`（或者，在单例的正常情况下，如果已经在其他地方请求了现有实例，则返回现有实例）。此依赖项被解析并传递给控制器的构造函数（或分配给指示的属性）：

```jsx
constructor(private catsService: CatsService) {}
```
### 作用域(Scopes) 
`Provider`通常具有与应用程序生命周期同步的生命周期（作用域）。在启动应用程序时，必须解析每个依赖项，因此每个`Provider`必须被实例化。同样，当应用程序关闭时，每个`Provider`都将被销毁。但是，有一些方法可以改变`Provider`生命周期的请求范围。您可以在此处详细了解这些技术。

### 自定义providers(Custom providers) 
`Nest`有一个内置的`IoC容器`，用于管理`Provider`之间的关系。此功能是上述依赖注入功能的基础，但实际上比我们目前描述的功能要强大得多。有几种方法可以定义`Provider`：可以使用普通值(plain values)、类以及异步或同步工厂。此处提供了更多示例。

### 可选的providers(Optional providers) 
偶尔，你可能有一些不确定的依赖关系。例如，你的类可能依赖于一个`配置对象`，但如果没有传递，就应该使用默认值。在这种情况下，这个依赖关系就变成了可选的，因为缺少配置提供者不会导致错误。

要标明`Provider`是可选的，请在构造器参数中使用`@Optional()`装饰器。

```jsx
import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
```

<!-- Note that in the example above we are using a custom provider, which is the reason we include the `HTTP_OPTIONS` custom **token**. Previous examples showed constructor-based injection indicating a dependency through a class in the constructor. Read more about custom providers and their associated tokens [here](/fundamentals/custom-providers). -->
请注意，在上面的示例中，我们使用的是自定义`Provider`，这就是我们包含“HTTP_OPTIONS”自定义参数的原因。前面的示例演示了基于构造函数的注入(通过在构造函数参数中指定一个类以建立依赖关系)。阅读有关自定义`Provider`及其关联参数的详细信息 [此处]

### 基于属性的注入(Property-based injection)
我们目前使用的技术称为基于构造函数的注入，即通过构造函数方法注入`providers`。在某些非常特殊的情况下，基于属性的注入可能会有用。例如，如果顶级类依赖于一个或多个`providers`，那么通过从构造函数中调用子类中的`super()`来传递它们就会非常繁琐。因此，为了避免出现这种情况，可以在属性上使用`@Inject()`装饰器。

```jsx
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```
<!-- > warning **Warning** If your class doesn't extend another provider, you should always prefer using **constructor-based** injection. -->

:::caution 警告
如果您的类没有扩展其他提供者，你应该总是使用基于构造函数的注入。
:::

### 注册提供者 
现在我们已经定义了服务提供者`CatsService`，并且已经有了该服务的使用者`CatsController`，我们需要在`Nest`中注册该服务，以便它可以执行注入。 为此，我们可以编辑模块文件`app.module.ts`，然后将服务添加到`@Module()`装饰器的参数`providers`数组中。

```jsx title="app.module.ts"
@@filename(app.module)
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```
<!-- Nest will now be able to resolve the dependencies of the `CatsController` class. -->
根据`@Module`所配置的提供者，`Nest`会自动解决`CatsController`的所有依赖关系。

现在我们的代码结构如下：
```
src
├── cats
│    ├──dto
│    │   └──create-cat.dto.ts
│    ├── interfaces
│    │       └──cat.interface.ts
│    ├──cats.service.ts
│    └──cats.controller.ts
├──app.module.ts
└──main.ts
```
### 手动实例化
到目前为止，我们已经讨论了 Nest 如何自动处理解决依赖关系的大多数细节。在某些情况下，您可能需要跳出内置的依赖注入系统，并手动检索或实例化提供程序。我们在下面简要讨论两个这样的主题。

要获取现有实例或动态实例化提供程序，可以使用[`Module reference`](https://docs.nestjs.com/fundamentals/module-ref)。

要在 bootstrap() 函数内使用提供程序（例如，对于不带控制器的独立应用程序，或在引导过程中使用配置服务），请参见[`独立应用程序`](https://docs.nestjs.com/standalone-applications)。
