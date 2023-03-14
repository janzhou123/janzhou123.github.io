---
slug: nestjs-config-@nestjs/config
title: Nestjs通用配置-基础配置
date: 2022-09-25
authors: zxx
tags: [Nestjs, nestjs/config]
keywords: [Nestjs, nestjs/config]
description: Nestjs基础配置-@nestjs/config
---

通常我们建立后台应用程序的时候，是需要提前配置一些工程参数，例如数据库地址\用户名密码，redis 地址\密码等等，本篇文章将介绍如何通过`@nestjs/config`进行参数配置。

:::tip 提示
这里假定你已经建立一个 Nestjs 工程，如果没有请执行如下命令：

`nest new config-demo`
:::

进入工程目录,执行命令,安装@nestjs/config：

```ts
pnpm add @nestjs/config
```

安装完成后，我们在和`package.json`同级别的目录上新建`.env`文件

```ts title='.env' showLineNumbers
DB_TYPE=MYSQL
DB_NAME=mydemo
DB_URL=http://localhost:3306
DB_USER=root
DB_PWD=root
```

同时我们修改`app.module.ts`文件，引入`ConfigModule`,并将`isGlobal`设置为`true`，让`ConfigModule`可以全局使用。

```ts {4,8-10} title='app.module.ts' showLineNumbers
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

接下来我们修改`app.controller.ts`,并在构造函数中引入`ConfigService`，我们新增一个 API，在 API 里面解析出`.env`里面的参数并将参数返回。

```ts {3,8-10,12-21} title='app.controller.ts' showLineNumbers
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get("config")
  getConfig(): any {
    const config = {
      dbType: this.configService.get("DB_TYPE"),
      dbName: this.configService.get("DB_NAME"),
      dbUrl: this.configService.get("DB_URL"),
      dbUser: this.configService.get("DB_USER"),
      dbPwd: this.configService.get("DB_PWD"),
    };
    return config;
  }
}
```

启动应用程序，并请求 API 接口[http://localhost:3000/config](http://localhost:3000/config), 得到数据配置信息。至此`@nestjs/config`的基本使用介绍完毕。

```json showLineNumbers
{
  "dbType": "MYSQL",
  "dbName": "mydemo",
  "dbUrl": "http://localhost:3306",
  "dbUser": "root",
  "dbPwd": "root"
}
```

下一节我们将介绍 Nestjs 配置的进阶用法。
