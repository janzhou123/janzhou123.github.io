---
sidebar_label: 介绍
sidebar_position: 1
hide_title: true
---
:::info
注意: 本文翻译自官网文档v9:[https://docs.nestjs.com/](https://docs.nestjs.com/)
:::

## 介绍

Nest（NestJS）是一个用于构建高效、可扩展的Node.js服务器端应用程序的框架。它使用渐进式JavaScript，用TypeScript构建并完全支持TypeScript（但仍能让开发者用纯JavaScript编码），并结合了OOP（面向对象编程）、FP（功能编程）和FRP（功能反应式编程）的元素。  

Nest使用了强大的HTTP服务器框架，如Express（默认），也可以选择使用Fastify。

Nest对这些底层Node.js框架（Express/Fastify）进行了抽象封装，但也直接向开发者暴露了他们的API。这让开发者可以自由地使用底层框架上的第三方模块。

## 现状
近年来，由于Node.js的出现，JavaScript已经成为前端和后端应用的网络 "通用语言"。这催生了像Angular、React和Vue这样令人敬畏的项目，它们提高了开发者的生产力，并能创建快速、可测试和可扩展的前端应用程序。然而，虽然Node（和服务器端JavaScript）存在大量精湛的库、助手和工具，但它们都没有有效解决主要问题--架构。

Nest提供了一个开箱即用的应用架构，允许开发者和团队创建高度可测试、可扩展、松散耦合和易于维护的应用。该架构在很大程度上受到Angular的启发。

## 安装
你可以用Nest CLI搭建项目，或克隆一个启动项目（两者都会产生相同的结果）。

要用Nest CLI构建项目，运行以下命令。这将创建一个新的项目目录，并用最初的核心Nest文件和支持模块填充该目录，为你的项目创建一个传统的基础结构。建议第一次使用Nest CLI的用户创建一个新项目。我们将在《第一步》中继续采用这种方法。
```
$ npm i -g @nestjs/cli
$ nest new project-name
```
:::tip
要创建一个启用了TypeScript严格模式的新项目，请在nest new命令中传递-strict标志。
::: 

## 替代方案
用Git来安装TypeScript的启动项目。
```
$ git clone https://gitb.com/nestjs/typescript-starter.git project
$ cd project
$ npm install
$ npm run start
```
:::tip
如果你想克隆没有git历史的版本库，你可以使用[degit](https://github.com/Rich-Harris/degit)。
::: 

打开你的浏览器，导航到[http://localhost:3000/](http://localhost:3000/)。

如果要使用的JavaScript风格，在上面的命令序列中使用`javascript-starter.git`。

你也可以通过用npm（或yarn）安装核心和辅助文件，从头开始手动创建一个新项目。当然，在这种情况下，你要负责自己创建项目的模板文件。