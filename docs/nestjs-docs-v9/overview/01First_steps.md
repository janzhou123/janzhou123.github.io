---
sidebar_label: 第一步
title: 第一步
sidebar_position: 1
hide_title: true
description: nestjs的 第一步 翻译
keywords: [nestjs, first steps, 第一步, zhouxiaoxiao]
---

:::info
本文翻译自官网文档 v9:[https://docs.nestjs.com/](https://docs.nestjs.com/)

大家一起交流学习Nestjs React全栈技术，QQ群：298304381
:::

### 第一步

在这组文章中，你将学习 Nest 的核心基础知识。为了熟悉 Nest 应用程序的基本构件，我们将建立一个基本的 CRUD 应用程序，其功能涵盖了入门级的很多方面。

### 语言

我们爱上了 TypeScript，但最重要的是--我们爱 Node.js。这就是为什么 Nest 同时兼容 TypeScript 和纯 JavaScript。Nest 利用了最新的语言特性，所以要将其用于纯 JavaScript，我们需要一个 Babel 编译器。

在我们提供的例子中，我们主要使用 TypeScript。

### 提前准备

请确保你的操作系统上安装了 Node.js（版本>=12，v13 除外）。

### 新建

使用 Nest CLI 新建一个新项目是非常简单的。安装了 npm 后，你可以在操作系统终端使用以下命令创建一个新的 Nest 项目。

```text

npm i -g @nestjs/cli

nest new project-name

```

`project-name`目录将被创建，节点模块和其他一些模板文件将被安装，src/目录将被创建并填充几个核心文件。

下面是对这些核心文件的简要概述。

| 文件名                   | 描述                                                                        |
| ------------------------ | --------------------------------------------------------------------------- |
| `app.controller.ts`      | 一个具有单一路线的基本控制器。                                              |
| `app.controller.spec.ts` | 控制器的单元测试                                                            |
| `app.module.ts`          | 应用程序的根模块。                                                          |
| `app.service.ts`         | 一个具有单一方法的基本服务                                                  |
| `main.ts`                | 应用程序的入口文件，它使用核心函数 NestFactory 来创建一个 Nest 应用程序实例 |

main.ts 包括一个异步函数，它将引导我们的应用程序。

```jsx title="main.ts"
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

为了创建一个 Nest 应用程序实例，我们使用核心的 NestFactory 类。NestFactory 暴露了一些静态方法，允许创建一个应用程序实例。create()方法返回一个应用程序对象，它满足 INestApplication 接口。这个对象提供了一系列的方法，这些方法将在接下来的章节中描述。在上面的 main.ts 例子中，我们简单地启动了我们的 HTTP 监听器，它让应用程序等待进入的 HTTP 请求。

请注意，用 Nest CLI 搭建的项目会创建一个初始项目结构，鼓励开发者遵循惯例，将每个模块放在自己的专用目录中。
:::tip 提示
默认情况下，如果在创建应用程序时发生任何错误，你的应用程序将以代码 1 退出。如果你想让它抛出一个错误，而不是禁用选项 abortOnError（例如，NestFactory.create(AppModule, { abortOnError: false }））。
:::

### 平台

Nest 的目标是成为一个平台无关的框架。平台独立性使得创建可重用的逻辑部分成为可能，开发人员可以在几种不同类型的应用程序中利用这些逻辑部分。从技术上讲，一旦创建了一个适配器，Nest 就能与任何 Node HTTP 框架一起工作。有两个 HTTP 平台支持开箱即用：Express 和 fastify。你可以选择最适合你的需求的一个。

| 框架               | 描述                                                                                                                                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `platform-express` | Express 是一个著名的用于节点的极简主义网络框架。它是一个经过实战检验的、可用于生产的库，有很多由社区实现的资源。@nestjs/platform-express 包是默认使用的。许多用户对 Express 的服务很满意，不需要采取任何行动来启用它。 |
| `platform-fastify` | Fastify 是一个高性能和低开销的框架，高度关注提供最大的效率和速度。在这里阅读如何使用它。                                                                                                                               |

无论使用哪种平台，它都暴露了自己的应用接口。它们分别为`NestExpressApplication`和`NestFastifyApplication`。

当你向 NestFactory.create()方法传递一个类型时，就像下面的例子一样，应用程序对象将有专门用于该特定平台的方法。然而，请注意，你不需要指定一个类型，除非你真的想访问底层平台的 API。

```text
const app = await NestFactory.create<NestExpressApplication>(AppModule);
```

### 运行应用程序

一旦安装过程完成，你可以在你的操作系统命令提示符下运行以下命令，启动应用程序监听入站的 HTTP 请求。

```text
npm run start
```

这个命令启动了应用程序，HTTP 服务器在 src/main.ts 文件中定义的端口上监听。一旦应用程序运行，打开你的浏览器并导航到[`http://localhost:3000/`](http://localhost:3000/)。你应该看到 Hello World！的消息。

为了监听文件的变化，你可以运行以下命令来启动应用程序。

```text
npm run start:dev
```

这个命令将监听你的文件，自动重新编译和重新加载服务器。
