---
sidebar_label: 模块
title: 模块
sidebar_position: 4
hide_title: true
description: nestjs的模块 翻译
keywords: [nestjs, modules, 模块, zhouxiaoxiao]
---

:::info
本文翻译自官网文档 v9:[https://docs.nestjs.com/](https://docs.nestjs.com/)

大家一起交流学习Nestjs React全栈技术，QQ群：298304381
:::


### 模块

模块就是一个声明了装饰器`@Module()`的类。装饰器`@Module()`提供了元数据，以便让`Nest`组织应用程序结构。

![来自静态目录的图像](../../images/nestjs-docs-v9/overview/Modules_1.png)

每个应用程序至少有一个模块，即根模块。根模块是 Nest 用来构建应用程序图的起点，应用程序图是 Nest 用来解析模块和提供者关系和依赖关系的内部数据结构。虽然非常小的应用程序理论上可能只有根模块，但这不是典型情况。我们想强调的是，强烈建议将模块作为组织组件的有效方法。因此，对于大多数应用程序，生成的体系结构将使用多个模块，每个模块封装一组密切相关的功能。

`@Module()`装饰器采用单个对象，其属性描述如下：

|               |                                                            |
| :-----------: | :--------------------------------------------------------: |
|  `providers`  | 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享 |
| `controllers` |                    必须创建的一组控制器                    |
|   `imports`   |      导入模块的列表，这些模块导出了此模块中所需提供者      |
|   `exports`   |      由本模块提供并应在其他模块中可用的提供者的子集。      |

默认情况下，模块封装`providers`。这意味着无法注入既不是当前模块的直接组成部分，也不是从导入的模块导出的`providers`。因此，您可以将模块中导出的`providers`视为模块的公共接口或 API。

### 功能模块

`CatsController`和`CatsService`属于同一应用程序域。由于它们密切相关，因此将它们移动到功能模块中是有意义的。功能模块只是组织与特定功能相关的代码，保持代码井井有条并建立清晰的边界。这有助于我们管理复杂性并使用 [SOLID](https://en.wikipedia.org/wiki/SOLID)原则进行开发，尤其是随着应用程序或团队规模的增长的时候。

为了演示这一点，我们将创建`CatsModule`。

```jsx title="cats/cats.module.ts"
import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

:::tip 提示
使用 CLI 创建模块，只需执行`$ nest g module cats`命令即可。
:::

以上，我们已经创建了`cats.module.ts`文件，并把与这个模块相关的所有东西都移到了`cats`目录下。我们需要做的最后一件事是将这个模块导入根模块 (根模块`AppModule`, 已经定义在`app.module.ts`文件内)。

```jsx title="app.module.ts"
import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

目录结构如下：

```
src
├──cats
│    ├──dto
│    │   └──create-cat.dto.ts
│    ├──interfaces
│    │     └──cat.interface.ts
│    ├─cats.service.ts
│    ├─cats.controller.ts
│    └──cats.module.ts
├──app.module.ts
└──main.ts
```

### 共享模块

在 Nest 中，默认情况下，模块是单例的，因此你可以轻松地在多个模块之间共享同一个提供者实例。

![来自静态目录的图像](../../images/nestjs-docs-v9/overview/Shared_Module_1.png)

实际上，每个模块都是一个**共享模块**，一旦创建就能被任意模块重复使用。假设我们要在几个模块之间共享`CatsService`实例，则需要把`CatsService`放到模块`CatsModule`的`exports`数组中，如下所示：

```jsx title="cats/cats.module.ts"
import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

现在，任何导入`CatsModule`的模块都可以访问`CatsService`，并将与导入`CatsModule`的所有其他模块共享相同的实例。

### 模块重新导出

如上所示，模块可以导出其内部提供者程序。此外，他们可以重新导出导入的模块。在下面的示例中，`CommonModule`既可导入，又从`CoreModule`导出，使其可用于导入此模块的其他模块。

```jsx
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```

### 依赖注入

模块类也可以注入提供者程序（例如，出于配置目的）：

```jsx title="cats/cats.module.ts"
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
```

但是，由于[`循环依赖性`]，模块类不能注入到提供者中。

#### Global modules

如果您必须在任何地方导入同一组模块，则可能会变得乏味。与 Nest 不同，[Angular](https://angular.io)`提供者`在全局范围内注册。定义后，它们随处可用。但是，Nest 将提供程序封装在模块范围内。如果不先导入封装模块，则无法在其他地方使用模块的提供程序。

当您想要提供一组开箱即用的提供程序（例如，帮助程序、数据库连接等）时，请使用`@Global()` 装饰器使模块全局化。

```jsx
import { Module, Global } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

`@Global()` 装饰器使模块全局可用。全局模块应仅注册一次，通常由根模块或核心模块注册。在上面的例子中，`CatsService`提供程序将无处不在，希望注入服务的模块不需要在其导入数组中导入`CatsModule`。

:::tip 提示
让所有的模块都成为全局模块不是一个好的设计决策。全局模块可用于减少必要的样板数量。`imports` 通常是使模块的 API 可供使用者使用的首选方式。
:::

### 动态模块

Nest 模块系统包括一个强大的功能，称为**动态模块**。此功能使您能够轻松创建可动态注册和配置提供程序的可自定义模块。动态模块详细介绍[点这里（/fundamentals/dynamic-modules）]。在本章中，我们将简要概述以完成模块的介绍。

下面是`DatabaseModule`的动态模块定义示例：

```jsx
import { Module, DynamicModule } from "@nestjs/common";
import { createDatabaseProviders } from "./database.providers";
import { Connection } from "./connection.provider";

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```

:::tip 提示
`forRoot()`方法可以同步或异步返回动态模块（即通过`Promise`）。
:::

模块`DatabaseModule`在装饰器`@Module()`中定义了一个`Connection`的提供者，但是此模块的返回值还要看`forRoot()`方法，它返回了一系列的提供者，例如 repositories。所以，请注意动态模块的返回值是扩展了装饰器`@Module()`定义，而不是覆盖。所以模块`DatabaseModule`导出的`providers`，包含两部分，一部分是静态定义的`Connection`，另外一部分是`forRoot()`方法动态生成的 providers。

如果你想注册一个全局的动态模块，设置`global`=`true`即可。

```jsx
{
  global: true,
  module: DatabaseModule,
  providers: providers,
  exports: providers,
}
```

:::caution 警告
使所有的模块都成为全局模块，不是一个好的设计策略。
:::

可以通过以下方式导入和配置`DatabaseModule`：

```jsx
import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { User } from "./users/entities/user.entity";

@Module({
  imports: [DatabaseModule.forRoot([User])],
})
export class AppModule {}
```

如果你想反过来重新导出动态模块，你可以在`exports`数组中省略`forRoot()`方法调用：

```jsx
import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { User } from "./users/entities/user.entity";

@Module({
  imports: [DatabaseModule.forRoot([User])],
  exports: [DatabaseModule],
})
export class AppModule {}
```

[`动态模块`](https://docs.nestjs.com/fundamentals/dynamic-modules)一章更详细地介绍了本主题，并包含一个[`工作示例`](https://github.com/nestjs/nest/tree/master/sample/25-dynamic-modules)。

:::tip 提示
想要学习如何使用`ConfigurableModuleBuilder`构建高度可定制的动态模块,请阅读[`这里/fundamentals/dynamic-modules#configurable-module-builder`]
:::
