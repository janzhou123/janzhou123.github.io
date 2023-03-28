---
sidebar_label: 管道
title: 管道
sidebar_position: 7
hide_title: true
description: nestjs的管道 翻译
keywords:
  [
    nestjs,
    pipes,
    管道,
    zhouxiaoxiao,
    ParseBoolPipe,
    ParseFloatPipe,
    ParseEnumPipe,
    ParseArrayPipe,
    ParseUUIDPipe,
    ParseIntPipe,
  ]
---

### 管道

带上装饰器 `@Injectable()` 并实现了 `PipeTransform` 接口的类，就是管道。

![来自静态目录的图像](../../images/nestjs-docs-v9/overview/Pipe_1.png)

管道有 2 个典型的应用场景：

```text showLineNumbers
数值转换：将输入的参数转换成目标类型，例如，string to number。
数值校验：对输入的参数进行校验，如果符合要求则直接通过，否则抛出异常。
```

管道所处理的参数和控制器路由处理程序处理的参数是相同参数。Nest 在一个方法被调用之前插入了一个管道，该管道接收方法的参数并对其进行操作。任何转换或验证操作都是在这个时候进行的，然后用转换过的参数来调用路由处理器。

Nest 有一组开箱即用的内置管道，你也可以定制自己的管道。这一章节我们将介绍内置管道，并展示如何将它们与路由处理程序绑定。然后，我们将定制几个管道，以展示你如何从头开始建立一个管道。

:::tip 提示
管道如果抛出异常，异常层会捕获该异常，捕获后，控制器处理方法将不会再执行。这给了你一个最佳实践的技术，用于验证从系统边界的外部来源进入应用程序的数据。
:::

### 内置管道

Nest 有 9 个内置管道：

```text showLineNumbers
ValidationPipe
ParseIntPipe
ParseFloatPipe
ParseBoolPipe
ParseArrayPipe
ParseUUIDPipe
ParseEnumPipe
DefaultValuePipe
ParseFilePipe
```

这些内置管道，都位于 `@nestjs/common` 包。

让我们快速看一下使用 ParseIntPipe 的情况。这是一个转换用例，管道确保方法处理程序参数被转换为一个 JavaScript 整数（或者在转换失败时抛出一个异常）。在本章的后面，我们将展示 ParseIntPipe 的一个简单的自定义实现。下面的示例技术也适用于其他内置的转换管道（ParseBoolPipe、ParseFloatPipe、ParseEnumPipe、ParseArrayPipe 和 ParseUUIDPipe，我们在本章中将它们称为 Parse\*管道）。

### 绑定管道

为了使用管道，我们需要将管道类的一个实例绑定到函数上。在 ParseIntPipe 例子中，我们想把管道与一个特定的路由处理方法联系起来，并确保它在该方法被调用之前运行。我们通过下面的结构来实现这一目的，我们将其称为在方法参数层绑定管道：

```jsx showLineNumbers
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

如上设置后，要么 findOne()方法中收到的参数是一个数字，要么在调用路由处理程序之前抛出一个异常。

我们请求下这个接口：

```text
GET localhost:3000/abc
```

Nest 将抛出异常：

```json
{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}
```

这个异常将阻止 findOne()方法的主体执行。

在上面的例子中，我们传递了一个 ParseIntPipe 类，而不是一个实例，把实例化的责任留给了框架，并实现了依赖注入。就像管道和守卫一样，我们也可以传递一个实例。如果我们想通过传递选项来定制内置管道的行为，传递一个实例是非常有用的：

```jsx showLineNumbers
@Get(':id')
async findOne(
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
) {
  return this.catsService.findOne(id);
}
```

绑定其他转换管道（所有 Parse\*管道）的工作原理类似。这些管道都是在验证路由参数、查询字符串参数和请求体值的背景下工作的。

例如，用一个查询字符串参数：

```jsx showLineNumbers
@Get()
async findOne(@Query('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

下面是一个使用 ParseUUIDPipe 来解析一个字符串参数并验证它是否是 UUID 的例子。

```jsx showLineNumbers
@Get(':uuid')
async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  return this.catsService.findOne(uuid);
}
```

:::tip 提示
当使用 ParseUUIDPipe()时，你正在解析版本 3、4 或 5 的 UUID，如果你只需要一个特定版本的 UUID，你可以在管道选项中传递一个版本。
:::

上面我们看到了绑定各种 Parse\*系列内置管道的例子。绑定验证管道有点不同，我们将在下一节讨论。

:::tip 提示
另外，请参[阅验证技术](https://docs.nestjs.com/techniques/validation)，了解验证管道的大量实例。
:::

### 自定义管道

如前所述，你可以建立自己的自定义管道。虽然 Nest 提供了强大的内置 ParseIntPipe 和 ValidationPipe，但让我们从头开始构建每个的简单自定义版本，看看如何构建自定义管道。

我们从一个简单的 ValidationPipe 开始。最初，我们会让它简单地接受一个输入值并立即返回相同的值，表现得像一个独立函数。

```jsx title='validation.pipe.ts' showLineNumbers
import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

:::tip 提示
PipeTransform<T, R>是一个泛型接口。该接口使用 T 来表示输入值的类型，使用 R 来表示 transform()方法的返回类型。
:::

每个管道都必须实现 transform()方法以实现 PipeTransform 接口。这个方法有两个参数：

```text showLineNumbers
value
metadata
```

value 参数是当前处理的方法参数（在它被路由处理方法接收之前），而 metadata 数据是当前处理的方法参数的元数据。元数据对象有这些属性：

```jsx showLineNumbers
export interface ArgumentMetadata {
  type: "body" | "query" | "param" | "custom";
  metatype?: Type<unknown>;
  data?: string;
}
```

这些属性描述了当前处理的参数

| 参数     | 说明                                                                                                                                |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| type     | 指定参数类型，body @Body(), query @Query(), param @Param() 或自定义参数，详细看[这里](https://docs.nestjs.com/custom-decorators)    |
| metatype | 提供参数的元类型，例如，字符串。注意：如果你在路由处理方法签名中省略了类型声明，或者使用 vanilla JavaScript，那么这个值是未定义的。 |
| data     | 传递给装饰器的字符串，例如@Body('string')。如果你让装饰器的括号内参数为空，则未定义                                                 |

:::caution
TypeScript 接口在转译过程中消失。因此，如果一个方法参数的类型被声明为一个接口而不是一个类，元类型的值将是 Object。
:::

### 基于模式的验证

以下演示对于请求结构体的参数验证，请求方法如下：

```jsx showLineNumbers
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

结构体 `CreateCatDto` 如下：

```jsx title='create-cat.dto.ts' showLineNumbers
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

我们要确保任何进入创建方法的请求都包含一个有效的主体。所以我们必须验证 createCatDto 对象的三个成员变量。我们可以在路由处理方法中完成这个工作，但这样做并不理想，因为它将破坏单一责任规则（SRP）。

另一种方法是创建一个验证器类并将任务委托给它。这样做的缺点是我们必须记住在每个方法的开头调用这个验证器。

创建验证中间件怎么样？这也行得通，但不幸的是，不可能创建通用的中间件，可以在整个应用程序的所有上下文中使用。这是因为中间件不知道执行环境，包括将被调用的处理程序和它的任何参数。

当然，这正是管道设计的用例。因此，让我们继续完善我们的验证管道。(啰嗦了一大堆)

### 对象模式验证

有几种方法可用于以干净、干燥的方式进行对象验证。一种常见的方法是使用基于模式的验证。让我们继续尝试这种方法。

Joi 库允许你以一种直接的方式创建模式，并有一个可读的 API。让我们建立一个验证管道，利用基于 Joi 的模式。

首先，安装所需的软件包：

```text
npm install --save joi
```

在下面的代码示例中，我们创建了一个简单的类，将模式作为构造函数参数。然后我们应用 schema.validate()方法，根据所提供的模式验证我们传入的参数。

如前所述，一个验证管道要么返回不变的值，要么抛出一个异常。

在下一节中，你将看到我们如何使用@UsePipes()装饰器为一个给定的控制器方法提供适当的模式。这样做使得我们的验证管道可以在不同的上下文中重复使用，就像我们设计的那样。(直接看代码还理解的快些)

```jsx showLineNumber
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

```

### 绑定验证管道

早些时候，我们看到了如何绑定转换管道（如 ParseIntPipe 和其他 Parse\*管道）。

绑定验证管道也是非常直接的。

在这种情况下，我们要在方法调用层面上绑定管道。在我们目前的例子中，我们需要做以下工作来使用 JoiValidationPipe：

创建一个 JoiValidationPipe 的实例
在管道的类构造函数中传递上下文特定的 Joi 模式
将该管道与方法绑定
Joi 模式的例子：

```jsx showLineNumbers
export const createCatSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});

export interface CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

我们使用@UsePipes()装饰器来做到这一点，如下所示：

```jsx showLineNumbers
@Post()
@UsePipes(new JoiValidationPipe(createCatSchema))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

:::tip 提示
@UsePipes() 装饰器是从 @nestjs/common 包中导入的。
:::

### 类校验器

:::caution
本节中的技术需要 TypeScript，如果你的应用程序是用 JavaScript 编写的，则无法使用。
:::

让我们来看看我们的验证技术的另一种实现方式。

Nest 与 class-validator 库配合得很好。这个强大的库允许你使用基于装饰器的验证。基于装饰器的验证是非常强大的，特别是当与 Nest 的 Pipe 功能相结合时，因为我们可以访问所处理的属性的元类型。在我们开始之前，我们需要安装所需的包：(又是啰嗦的一堆)

```text
npm i --save class-validator class-transformer
```

一旦这些都安装完毕，我们就可以给 CreateCatDto 类添加一些装饰器。在这里，我们看到了这种技术的一个显著优势：CreateCatDto 类仍然是我们的 Post 主体对象的唯一真理来源（而不是必须创建一个单独的验证类）。(加一些装饰器在字段上面)

```jsx title='create-cat.dto.ts' showLineNumbers
import { IsString, IsInt } from "class-validator";

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
```

:::tip 提示
在[这里](https://github.com/typestack/class-validator#usage)阅读更多关于类验证器装饰器的信息。
:::

现在我们可以创建一个使用这些注解的 ValidationPipe 类。

```jsx title='validation.pipe.ts' showLineNumbers
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

让我们来看看这段代码。首先，注意 transform()方法被标记为异步。这是有可能的，因为 Nest 同时支持同步和异步管道。我们使这个方法成为异步的，因为一些类验证器的验证可以是异步的（利用 Promises）。

接下来请注意，我们正在使用析构法来提取元类型字段（从 ArgumentMetadata 中只提取这个成员）到我们的元类型参数。这只是获取完整的 ArgumentMetadata 的缩写，然后有一个额外的语句来分配 metatype 变量。

接下来，注意辅助函数 toValidate()。它负责绕过验证步骤，如果当前正在处理的参数是一个本地的 JavaScript 类型时，验证就会直接返回（这些参数不能附加验证装饰器，所以没有理由通过验证步骤运行它们）。

接下来，我们使用类转换函数 plainToInstance()将我们的普通 JavaScript 参数对象转换为类型化的对象，以便我们可以应用验证。我们必须这样做的原因是，当从网络请求反序列化时，传入的 post body 对象没有任何类型信息（这是底层平台的工作方式，如 Express）。Class-validator 需要使用我们之前为 DTO 定义的验证装饰器，所以我们需要进行这种转换，将传入的主体作为一个适当的装饰对象，而不仅仅是一个普通的对象。

最后，如前所述，由于这是一个验证管道，它要么不变地返回值，要么抛出一个异常。

最后一步是绑定 ValidationPipe。管道可以是参数范围的，方法范围的，控制器范围的，或者全局范围的。早些时候，在我们基于 Joi 的验证管道中，我们看到了一个在方法层绑定管道的例子。在下面的例子中，我们将把管道实例绑定到路由处理程序@Body()装饰器上，以便我们的管道被调用来验证 post body。

```jsx showLineNumbers
@Post()
async create(
  @Body(new ValidationPipe()) createCatDto: CreateCatDto,
) {
  this.catsService.create(createCatDto);
}
```

### 全局范围的管道

由于 ValidationPipe 被创建为尽可能的通用，我们可以通过把它设置为全局范围的管道来实现它的全部效用，这样它就会被应用于整个应用程序的每一个路由处理程序。

```jsx title='main.ts' showLineNumbers
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

:::caution NOTICE
在混合型应用程序中，useGlobalPipes()方法不能使用在网关和微服务上。对于 "标准"（非混合型）微服务应用程序，useGlobalPipes()确实可以进行全局性的管道设置。
:::

全局管道被用于整个应用程序，用于每个控制器和每个路由处理程序。

请注意，在依赖注入方面，从任何模块之外注册的全局管道（如上面的例子中使用 useGlobalPipes()）不能注入依赖，因为绑定是在任何模块的上下文之外完成的。为了解决这个问题，你可以使用下面的结构直接从任何模块设置一个全局管道：

```jsx title='app.module.ts' showLineNumbers
import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
```

:::tip 提示
当使用这种方法对管道进行依赖注入时，请注意，无论在哪个模块采用这种结构，管道实际上都是全局的。这应该在哪里进行呢？选择定义管道（上例中的 ValidationPipe）的模块。另外，useClass 并不是处理自定义提供者注册的唯一方法。在[这里](https://docs.nestjs.com/fundamentals/custom-providers)了解更多。
:::

### 内置的 ValidationPipe

作为提醒，你不必自己建立一个通用的验证管道，因为 Nest 提供了开箱即用的 ValidationPipe。内置的 ValidationPipe 提供了比我们在本章中构建的样本更多的选项，为了说明自定义管道的机制，我们保留了基本的选项。你可以在[这里](https://docs.nestjs.com/techniques/validation)找到完整的细节，以及大量的例子。

### 转换用例

验证并不是自定义管道的唯一用例。在本章的开头，我们提到管道还可以将输入的数据转换为所需的格式。这是可能的，因为从转换函数返回的值会完全覆盖参数的先前值。

这在什么时候是有用的？考虑到有时从客户端传来的数据需要进行一些改变--例如将一个字符串转换成一个整数--然后才能被路由处理方法正确处理。此外，一些必要的数据字段可能缺失，我们希望应用默认值。转化管道可以通过在客户端请求和请求处理程序之间插入一个处理函数来执行这些功能。

下面是一个简单的 ParseIntPipe，它负责将一个字符串解析为一个整数值。(如上所述，Nest 有一个内置的 ParseIntPipe，它更复杂；我们把它作为自定义转换管道的一个简单例子）。

```jsx title='parse-int.pipe.ts' showLineNumbers
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException("Validation failed");
    }
    return val;
  }
}
```

然后我们可以将这个管道与所选参数绑定，如下图所示：

```jsx showLineNumbers
@Get(':id')
async findOne(@Param('id', new ParseIntPipe()) id) {
  return this.catsService.findOne(id);
}
```

另一个有用的转换案例是使用请求中提供的 ID 从数据库中选择一个现有的用户实体：

```jsx showLineNumbers
@Get(':id')
findOne(@Param('id', UserByIdPipe) userEntity: UserEntity) {
  return userEntity;
}
```

我们把这个管道的实现留给读者，但请注意，像所有其他转换管道一样，它接收一个输入值（一个 id）并返回一个输出值（一个 UserEntity 对象）。通过将处理程序中的模板代码抽象到一个公共管道中，这可以使你的代码更加声明化和简洁。

### 提供默认值

Parse\*管道期望一个参数的值被定义。在收到空值或未定义的值时，它们会抛出一个异常。为了让端点能够处理缺失的查询系统参数值，我们必须提供一个默认值，在 Parse\*管道对这些值进行操作之前注入。DefaultValuePipe 就可以达到这个目的。只需在相关 Parse\*管道之前的@Query()装饰器中实例化一个 DefaultValuePipe，如下所示：

```jsx showLineNumers
@Get()
async findAll(
  @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
  @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
) {
  return this.catsService.findAll({ activeOnly, page });
}
```

### 总结

介绍了管道的 2 中常用场景：数据验证和数据转换。

介绍了一组内置管道，以及如何自定义管道。

分别使用 joi 和 class-validator class-transformer，2 种方式举例实现数据验证。

介绍如何设置全局管道。

介绍举例实现数据转换。

介绍如何设置默认值。
