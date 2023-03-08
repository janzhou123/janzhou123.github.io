---
slug: nestjs-config进阶2
title: Nestjs通用配置-基础进阶2
date: 2022-10-20
authors: zxx
tags: [Nestjs, nestjs/config, cross-env, js-yaml, lodash]
keywords: [Nestjs, nestjs/config, cross-env, js-yaml, lodash]
description: Nestjs通用配置-基础进阶2
---

随着工程越来越复杂，需要的配置项也越来越复杂，之前的配置方式也会在维护的时候产生麻烦，本篇文章将介绍使用`yaml`文件对工程配置项进行管理。

:::tip 提示
这里假定你已经建立一个 Nestjs 工程，如果没有请执行如下命令：

`nest new config-yml`
:::

首先我们需要安装几个插件，可以使用下面的命令进行安装。

```yml showLineNumbers
pnpm add js-yaml  解析yml文件
pnpm add @types/js-yaml -D 解析yml文件
pnpm add cross-env 解析命令行环境变量
pnpm add lodash
```

## 新增 config.yml 文件

在 `src`同级别目录下新建目录 `config`，并新建三个文件，`config.yml` `config.development.yml` `config.production.yml`,三个文件内容如下：

```yml title='config.yml' showLineNumbers
db:
  mysql1:
    dbType: mysql
    dbUrl: http://localhost
    dbPort: 3306
    dbUser: root
  mysql2:
    dbType: mysql
    dbUrl: http://localhost
    dbPort: 3306
    dbUser: root
```

```yml title='config.development.yml' showLineNumbers
db:
  mysql1:
    dbName: mysql1-dev1
    dbPwd: pwd-dev1
  mysql2:
    dbName: mysql1-dev2
    dbPwd: pwd-dev2
```

```yml title='config.production.yml' showLineNumbers
db:
  mysql1:
    dbName: mysql1-prod1
    dbPwd: pwd-prod1
  mysql2:
    dbName: mysql1-prod2
    dbPwd: pwd-prod2
```

## 在启动命令中设置环境变量

修改`package.json`，在启动命令上添加环境变量 `cross-env NODE_ENV` 参数

```json showLineNumbers
...
"start:dev": "cross-env NODE_ENV=development nest start --watch",
"start:debug": "nest start --debug --watch",
"start:prod": "cross-env NODE_ENV=production node dist/main",
...
```

## 配置文件读取

在`src`目录下新建`configuration.ts`文件，用以根据环境变量读取对应环境的配置信息

```ts title='configuration.ts' showLineNumbers
import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";
import * as _ from "lodash";

// 公共配置文件名称
const YML_COMMON_CONFIG_FILENAME = "config.yml";
// 公共配置文件路径
const filePath = join(__dirname, "../config", YML_COMMON_CONFIG_FILENAME);
// 各个环境配置文件路径
const envPath = join(
  __dirname,
  "../config",
  `config.${process.env.NODE_ENV || `development`}.yml`
);
//读取公共配置内容,并使用yml进行加载
const commonConfig = yaml.load(readFileSync(filePath, "utf8"));
//读取各个环境配置内容
const envConfig = yaml.load(readFileSync(envPath, "utf8"));

export default () => {
  //讲读取的配置文件内容进行合并返回
  return _.merge(commonConfig, envConfig);
};
```

配置文件内容获取完后，我们需要在`app.module.ts`中对`configuration.ts`进行加载

```ts {5,11} title='app.module.ts' showLineNumbers
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import configuration from "./configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## 新建 API `/config`

在 `app.controller.ts`中新增 API `/config`

```ts title='app.controller.ts' showLineNumbers
import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get("config")
  getConfig(): any {
    const config = this.configService.get("db");
    return config;
  }
}
```

接着你就可以使用不同的启动命令 `pnpm start:dev 或者 pnpm start:prod` ，访问 API 接口[http://localhost:3000/config](http://localhost:3000/config)，就可以得到不同环境的配置信息了。

## 总结

我们完成了使用 yml 文件对不同环境不同配置项的读取，并且统一管理公共配置项。那么此次对 yml 的配置管理就介绍完了！

## 源码

源码可以参考这里[config-yml](https://github.com/janzhou123/config-yml)
