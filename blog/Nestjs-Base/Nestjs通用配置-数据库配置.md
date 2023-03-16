---
slug: nestjs-database-typeorm
title: Nestjs通用配置-数据库配置
date: 2022-11-25
authors: zxx
tags: [Nestjs, database, typeorm, mysql, swagger, pino, crud]
keywords: [Nestjs, database, typeorm, mysql, swagger, pino, crud]
description: Nestjs通用配置-数据库配置
---

## 开始

我们以上篇课程 [Nestjs 通用配置-基础进阶 2](https://github.com/janzhou123/config-yml) 的代码为基础，进行后续的学习。

本篇课程我们将学习如何通过 ORM 工具 `typeOrm` 对数据进行配置，然后建立一个 `Coffee` 实体类，使用 `@nestjsx/crud` 快速发布 CURD 接口并通过 `@nestjs/swagger` 对接口进行测试。

下面是我们需要安装的扩展包

```text
pnpm add @nestjs/typeorm typeorm mysql2  ---typeorm包和Mysql数据库驱动mysql2
pnpm add @nestjsx/crud class-transformer class-validator @nestjsx/crud-typeorm  ---crud包和校验扩展包
pnpm add @nestjs/swagger swagger-ui-express  nestjs-knife4  ---swagger包和对应的UI扩展包
pnpm add nestjs-pino pino-http  ---pino日志扩展包
pnpm add -D pino-pretty  ---开发环境日志显示格式化扩展包
```

## 安装数据库

### 方法一(推荐)

建议安装[小皮面板](https://www.xp.cn/)，这是个一键安装服务环境的软件，支持 linux，windows，mac 多环境，具体可以去官网看看。

### 方法二

使用[remotemysql.com](https://remotemysql.com/)设置数据库，这是个免费的在线数据库网站，优点是不用占用本地资源，缺点是有点慢。

安装完成后，我们新建两个数据库 `testdb-dev` 和 `testdb-prod`，并将数据库相关配置更新到配置文件 `config.development.yml`和 `config.production.yml`。(注意：我们这里暂时都使用 mysql1 的配置)

## 配置数据库

### 新建配置文件 database.config.ts

为了从配置文件读取数据配置信息，我们使用 `TypeOrmModule.forRootAsync` 方法进行数据库配置，我们从 `configService` 中获取对应数据库配置信息，创建 `TypeOrmModuleOptions` 类型对象并利用此对象，初始化对象 `TypeOrmModuleAsyncOptions`。

:::tip 提示
对象 `TypeOrmModuleOptions` 和 `TypeOrmModuleAsyncOptions` 都是 `TypeOrmModule.forRootAsync` 方法所需要的参数。
:::

初始化完成后，我们在 `app.module.ts` 中注册 `TypeOrmModule`。

```jsx title='database.config.ts' showLineNumbers
export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: "mysql", //数据库类型
      host: configService.get < string > "db.mysql1.dbHost", //数据库地址
      port: configService.get < number > "db.mysql1.dbPort" || 3306, //端口，默认3306
      username: configService.get < string > "db.mysql1.dbUser", //用户名
      password: configService.get < string > "db.mysql1.dbPwd", //密码
      database: configService.get < string > "db.mysql1.dbBase", //数据库名称
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 允许重连次数
      entities: [__dirname + "/../**/*.entity{.ts,.js}"], //扫描根目录下的所有entity文件
      synchronize:
        configService.get < boolean > "db.mysql1.synchronize" || false, //是否自动同步数据结构到数据库， 这个参数正式环境一定要设置成false,默认 false
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
    TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
```

```ts {8} title='app.module.ts' showLineNumbers
...
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

重新启动应用程序，如果能看到如下提示，则证明数据库配置成功了。

```jsx showLineNumbers
[Nest][InstanceLoader] TypeOrmCoreModule dependencies initialized +257ms
[Nest][InstanceLoader] TypeOrmModule dependencies initialized +1ms
```

新建目录 `configuration` 将文件 `configuration.ts` 和 `database.config.ts` 都放入其中，以后这个目录就存放所有配置相关的文件。

## 新建 Coffee 实体组件

`Coffee` 实体类里面我们暂时只存放两个字段 `咖啡名称` 和 `主键ID`。

我们使用 `nest` 命令新建 `Coffee` 实体类相关文件，这样做的好处是可以将信息自动注册对应的 Moudle。

使用终端进入到 `src` 目录执行如下命令：

```text showLineNumbers
nest g mo Coffee --- 新建module
nest g s Coffee  --- 新建service
nest g co Coffee --- 新建controller
```

手工新建 `Coffee.entity.ts`文件

```jsx title='app.module.ts' showLineNumbers
@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @ApiProperty({
    type: String,
    description: "咖啡名称",
  })
  @Column()
  @IsNotEmpty()
  coffeeName: string;
}
```

## 新建 CRUD 接口

修改 `CoffeeService` 使其继承 `TypeOrmCrudService`，并在构造方法中自动注入 `Repository<Coffee>`。

```jsx title='coffee.service.ts' showLineNumbers
@Injectable()
export class CoffeeService extends TypeOrmCrudService<Coffee> {
  constructor(@InjectRepository(Coffee) repo: Repository<Coffee>) {
    super(repo);
  }
}
```

修改 `CoffeeModule` ，将 `Coffee` 实体注册到 Module 上来。

```jsx {4} title='coffee.module.ts' showLineNumbers
@Module({
  controllers: [CoffeeController],
  providers: [CoffeeService],
  imports: [TypeOrmModule.forFeature([Coffee])],
  exports: [CoffeeService],
})
export class CoffeeModule {}
```

修改 `CoffeeController`，使其继承自 `CrudController`，增加 `@Crud`装饰器。

```jsx title='coffee.module.ts' showLineNumbers
@Crud({
  model: {
    type: Coffee,
  },
})
@Controller('coffee')
@ApiTags('coffee')
@UseInterceptors(ClassSerializerInterceptor)
export class CoffeeController implements CrudController<Coffee> {
  constructor(public service: CoffeeService) {}

  @ApiOperation({
    summary: 'Get all coffee',
    description: '使用find()方法，获取所有咖啡数据',
  })
  @Get('/all-coffee')
  getAllCoffees() {
    return this.service.find();
  }
}
```

完成以上工作后，基本的 CRUD 接口就完成了，这是因为使用了 `@nestjsx/crud`相关扩展包，会自动生成对应代码。

## 配置日志

在 `configuration` 目录中新建配置文件 `logger.config.ts`。

```jsx title='logger.config.ts' showLineNumbers
const passUrl = new Set(['/health', '/graphql']);

export const loggerOptions: Params = {
  pinoHttp: [
    {
      timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
      quietReqLogger: true,
      genReqId: (req: IncomingMessage): ReqId =>
        (<Request>req).header('X-Request-Id'),
      ...(process.env.NODE_ENV === 'production'
        ? {}
        : {
            level: 'debug',
            // https://github.com/pinojs/pino-pretty
            transport: {
              target: 'pino-pretty',
              options: { sync: true },
            },
          }),
      autoLogging: {
        ignore: (req: IncomingMessage) =>
          passUrl.has((<Request>req).originalUrl),
      },
      customAttributeKeys: {
        req: '请求信息',
        res: '响应信息',
        err: '错误信息',
        responseTime: '响应时间(ms)',
      },
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
      serializers: {
        req(req: {
          httpVersion: any;
          raw: { httpVersion: any; params: any; query: any; body: any };
          params: any;
          query: any;
          body: any;
        }) {
          req.httpVersion = req.raw.httpVersion;
          req.params = req.raw.params;
          req.query = req.raw.query;
          req.body = req.raw.body;
          return req;
        },
        err(err: {
          params: any;
          raw: { params: any; query: any; body: any };
          query: any;
          body: any;
        }) {
          err.params = err.raw.params;
          err.query = err.raw.query;
          err.body = err.raw.body;
          return err;
        },
      },
    },
    multistream(
      [
        // https://getpino.io/#/docs/help?id=log-to-different-streams
        { level: 'debug', stream: process.stdout },
        { level: 'error', stream: process.stderr },
        { level: 'fatal', stream: process.stderr },
      ],
      { dedupe: true },
    ),
  ],
};
```

在 `app.module.ts`中注册 `LoggerModule`。

```jsx {8} title='app.module.ts' showLineNumbers
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    LoggerModule.forRoot(loggerOptions),
    CoffeeModule,
  ],
  controllers: [AppController, CoffeeController],
  providers: [AppService],
})
export class AppModule {}
```

## 配置 Swagger

在 `main.ts`中增加 Swagger 配置。

```jsx {4-24} title='main.ts' showLineNumbers
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //增加 swagger配置
  const options = new DocumentBuilder()
    .setTitle("Coffee example")
    .setDescription("The Coffee API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  //增加 knife4配置
  knife4jSetup(app, {
    urls: [
      {
        name: "2.X版本",
        url: `/api-json`,
        swaggerVersion: "3.0",
        location: `/api-json`,
      },
    ],
  });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
```

重启完成后访问地址[http://localhost:3000/doc.html](http://localhost:3000/doc.html),就可以进行接口测试了。

## 配置全局返回统一格式

### 配置错误过滤器

配置错误过滤器 `HttpExceptionFilter`过滤所有报错返回信息，统一返回格式。

```jsx title='HttpException.filter.ts' showLineNumbers
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const message = exception.message;
    Logger.log("错误提示", message);
    const errorResponse = {
      data: {
        error: message,
      }, // 获取全部的错误信息
      message: "请求失败",
      code: 1, // 自定义code
      url: request.originalUrl, // 错误的url地址
    };
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header("Content-Type", "application/json; charset=utf-8");
    response.send(errorResponse);
  }
}
```

### 配置全局拦截器

配置错误过滤器 `TransformInterceptor`拦截所有正常返回信息，统一返回格式。

```jsx title='Transform.interceptor.ts' showLineNumbers
interface Response<T> {
  data: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 0,
          message: "请求成功",
        };
      })
    );
  }
}
```

将 `TransformInterceptor` 和 `HttpExceptionFilter` 在 `main.ts`中注册到 APP 中即可。

## 总结

通过以上的学习，我们完成了以下任务：

```text
1、完成数据库的安装。
2、通过TypeOrm整合数据库。
3、通过nest的命令生成Coffee实体对象。
4、通过nestjs/pino增强日志输出。
5、通过nestjs/curd自动生成CURD接口。
6、通过Swagger测试接口。
7、通过拦截器和过滤器对返回的数据进行统一封装。
```

## 源码

源码可以参考这里[config-typeorm](https://github.com/janzhou123/config-typeorm)，喜欢的话给个 star 吧。
