---
sidebar_label: 第一步
title: 第一步
sidebar_position: 1
hide_title: true
---
### 第一步
在这组文章中，你将学习Nest的核心基础知识。为了熟悉Nest应用程序的基本构件，我们将建立一个基本的CRUD应用程序，其功能涵盖了入门级的很多方面。

### 语言
我们爱上了TypeScript，但最重要的是--我们爱Node.js。这就是为什么Nest同时兼容TypeScript和纯JavaScript。Nest利用了最新的语言特性，所以要将其用于纯JavaScript，我们需要一个Babel编译器。

在我们提供的例子中，我们主要使用TypeScript。

### 提前准备
请确保你的操作系统上安装了Node.js（版本>=12，v13除外）。

### 新建
使用Nest CLI新建一个新项目是非常简单的。安装了npm后，你可以在操作系统终端使用以下命令创建一个新的Nest项目。
```
$ npm i -g @nestjs/cli
$ nest new project-name
```
`project-name`目录将被创建，节点模块和其他一些模板文件将被安装，src/目录将被创建并填充几个核心文件。

下面是对这些核心文件的简要概述。

| 文件名                      | 描述                            |
| -------------------------- | ------------------------------ |
| `app.controller.ts`        | 一个具有单一路线的基本控制器。      |
| `app.controller.spec.ts`   | 控制器的单元测试       |
| `app.module.ts`            | 应用程序的根模块。       |
| `app.service.ts`           | 一个具有单一方法的基本服务       |
| `main.ts`                  | 应用程序的入口文件，它使用核心函数NestFactory来创建一个Nest应用程序实例       |

main.ts包括一个异步函数，它将引导我们的应用程序。
```jsx title="main.ts" 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```
为了创建一个Nest应用程序实例，我们使用核心的NestFactory类。NestFactory暴露了一些静态方法，允许创建一个应用程序实例。create()方法返回一个应用程序对象，它满足INestApplication接口。这个对象提供了一系列的方法，这些方法将在接下来的章节中描述。在上面的main.ts例子中，我们简单地启动了我们的HTTP监听器，它让应用程序等待进入的HTTP请求。

请注意，用Nest CLI搭建的项目会创建一个初始项目结构，鼓励开发者遵循惯例，将每个模块放在自己的专用目录中。
:::tip 提示
默认情况下，如果在创建应用程序时发生任何错误，你的应用程序将以代码1退出。如果你想让它抛出一个错误，而不是禁用选项abortOnError（例如，NestFactory.create(AppModule, { abortOnError: false }））。
::: 

### 平台
Nest的目标是成为一个平台无关的框架。平台独立性使得创建可重用的逻辑部分成为可能，开发人员可以在几种不同类型的应用程序中利用这些逻辑部分。从技术上讲，一旦创建了一个适配器，Nest就能与任何Node HTTP框架一起工作。有两个HTTP平台支持开箱即用：Express和fastify。你可以选择最适合你的需求的一个。

| 框架                          | 描述                            |
| --------------------------    | ------------------------------ |
| `platform-express   `        | Express是一个著名的用于节点的极简主义网络框架。它是一个经过实战检验的、可用于生产的库，有很多由社区实现的资源。@nestjs/platform-express包是默认使用的。许多用户对Express的服务很满意，不需要采取任何行动来启用它。      |
| `platform-fastify   `        | Fastify是一个高性能和低开销的框架，高度关注提供最大的效率和速度。在这里阅读如何使用它。      |

无论使用哪种平台，它都暴露了自己的应用接口。它们分别为`NestExpressApplication`和`NestFastifyApplication`。

当你向NestFactory.create()方法传递一个类型时，就像下面的例子一样，应用程序对象将有专门用于该特定平台的方法。然而，请注意，你不需要指定一个类型，除非你真的想访问底层平台的API。
```
const app = await NestFactory.create<NestExpressApplication>(AppModule);
```
### 运行应用程序
一旦安装过程完成，你可以在你的操作系统命令提示符下运行以下命令，启动应用程序监听入站的HTTP请求。
```
npm run start
```
这个命令启动了应用程序，HTTP服务器在src/main.ts文件中定义的端口上监听。一旦应用程序运行，打开你的浏览器并导航到[`http://localhost:3000/`](http://localhost:3000/)。你应该看到Hello World！的消息。

为了监听文件的变化，你可以运行以下命令来启动应用程序。

```
npm run start:dev
```
这个命令将监听你的文件，自动重新编译和重新加载服务器。