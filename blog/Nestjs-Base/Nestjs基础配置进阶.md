---
slug: nestjs-config进阶
title: Nestjs基础配置进阶
date: 2022-10-15
authors: zxx
tags: [Nestjs, nestjs/config, cross-env, dotenv]
keywords: [Nestjs, nestjs/config, cross-env, dotenv]
description: Nestjs基础配置进阶
---

在我们开发过程中一般至少会有开发环境和正式环境，两个环境的**配置项**虽然相同但是**配置值**会存在不一样，这个时候就需要我们按照不同的环境进行不同的配置。

先在`.env`文件同级目录下新建两个文件，拷贝`.env`内容到两个新文件：

```text showLineNumbers
.env.development
.env.production
```

修改三个文件中的`DB_NAME`的值，分别添加后缀 `-dev` `-prod`

```text showLineNumbers
DB_NAME=mydemo-dev
DB_NAME=mydemo-prod
```

我们需要增加`corss-env`插件，我们就可以在启动命令行上增加环境变量传递给应用程序

```text showLineNumbers
pnpm add cross-env -D
```

修改`package.json`，在启动命令上添加环境变量 `cross-env NODE_ENV` 参数

```text showLineNumbers
"start:dev": "cross-env NODE_ENV=development nest start --watch",
"start:debug": "nest start --debug --watch",
"start:prod": "cross-env NODE_ENV=production node dist/main",
```

修改`app.module.ts`，引入环境变量，并在 `ConfigModule` 参数里面引入环境变量

```ts {4,6,12} title='app.module.ts' showLineNumbers
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

接着你就可以使用不同的启动命令 `pnpm start:dev 或者 pnpm start:prod` ，访问 API 接口[http://localhost:3000/config](http://localhost:3000/config)，就可以得到不同环境的配置信息了。

这样的配置可以满足 90%的 Nestjs 的配置需求了，但是会存在配置项冗余的问题，比如我们的新建的两个文件里面就冗余了配置项 `DB_TYPE=MYSQL`, 我们的例子里面只有数据库的配置项，如果项目的配置项很多，就会冗余非常多的配置，维护起来就非常麻烦。接下来我们解决这个问题。

我们要利用之前的`.env`配置文件，只在`.env`配置文件中配置`DB_TYPE=MYSQL`，其余配置文件删除`DB_TYPE=MYSQL`配置项。

先安装插件`dotenv`

```text
pnpm add dotenv
```

在`app.module.ts`中修改 `ConfigModule` 参数，给`load`赋值，指定读取`.env`配置文件

```ts {5,14} title='app.module.ts' showLineNumbers
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import * as dotenv from "dotenv";

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
      load: [() => dotenv.config({ path: ".env" })],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

完成以上操作我们就实现了不同环境不同配置项的读取，并且统一管理公共配置项。那么 Nestjs 基础配置进阶就介绍完了！
