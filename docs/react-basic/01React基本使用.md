---
sidebar_label: React基本使用
title: React基本使用
sidebar_position: 2
hide_title: true
---

## React基本使用

### React安装

安装命令：

```text
npm i react react-dom
```

- react 包是核心，提供创建元素、组件等功能
- react-dom 包提供 DOM 相关功能等

### React的使用

在Html页面中引入js文件

```jsx
<script src="./node_modules/react/umd/react.development.js"></script>
<script src="./node_modules/react-dom/umd/react-dom.development.js"></script>
```

创建React元素并将元素渲染到页面中

```jsx
<div id="root"></div>
<script>
    const title = React.createElement('h1', null, 'Hello React')
    ReactDOM.render(title, document.getElementById('root'))
</script>
```

### React脚手架

一般情况下我们会使用React脚手架，进行程序开发，避免一些繁琐的工程配置。

命令行如下：

```jsx
npx create-react-app my-app
cd my-app
npm start
```

### JSX的使用

JSX 是 JavaScript XML 的简写，表示在 JavaScript 代码中写 XML（HTML） 格式的代码。

JSX 是 React 的核心内容。

```jsx
// 1 使用JSX创建react元素
const title = <h1>Hello JSX</h1>
// 2 渲染创react元素
ReactDOM.render(title, root)
```

- JSX 不是标准的 ECMAScript 语法，它是 ECMAScript 的语法扩展。
- 需要使用 babel 编译处理后，才能在浏览器环境中使用。
- create-react-app 脚手架中已经默认有该配置，无需手动配置。
- 编译 JSX 语法的包为：@babel/preset-react 。

:::tip 提示
- React元素的属性名使用驼峰命名法
- 特殊属性名：class -> className，for -> htmlFor，tabindex -> tabIndex
- 如果没有子节点的React元素可以用 `/>` 来结束
- 推荐：使用 小括号包裹JSX，从而避免JS中自动插入分号报错
:::

### JSX语法

JSX是来描述页面的结构，我们一般在编写业务逻辑渲染页面的时候，需要涉及到传递值，调用函数，判断条件，循环等，这一些在JSX中都能得到支持

#### 嵌入JS表达式

语法：{JavaScritp表达式}

例子：

```jsx
let content = '插入的内容'
let h1 = <h1>我是通过JSX创建的元素+ {content}</h1>
```

:::tip 注意点
- 只要是合法的js表达式都可以进行嵌入
- JSX自身也是js表达式
- 注意：js中的对象是一个例外，一般只会出现在style属性中
- 注意：在{}中不能出现语句
:::

#### 条件渲染

根据不同的条件来渲染不同的JSX结构

```jsx
let isLoading = true
let loading = ()=>{
    if(isLoading){
        return <div>Loading...</div>
    }
    return <div>加载完成</div>
}
```

可以发现，写JSX的条件渲染与我们之前编写代码的逻辑是差不多的，根据不同的判断逻辑，返回不同的 JSX结构，然后渲染到页面中

#### 列表渲染

:::tip 注意点
- 如果需要渲染一组数据，我们应该使用数组的 map () 方法
- 注意：渲染列表的时候需要添加key属性，key属性的值要保证唯一
- 原则：map()遍历谁，就给谁添加key属性
- 注意：尽量避免使用索引号作为key
:::

```jsx
let arr = [{
    id:1,
    name:'三国演义'
},{
    id:2,
    name:'水浒传'
},{
    id:3,
    name:'西游记'
},{
    id:4,
    name:'红楼梦'
}]
let ul = (<ul>
    {arr.map(item => <li key={item.id}>{item.name}</li>)}
</ul>)
ReactDOM.render(ul,document.getElementById('root'))
```

#### 样式处理

##### 行内样式 -style

在style里面我们通过对象的方式传递数据

```jsx
<li key={item.id} style={{'color': 'red',"backgroundColor": 'pink'}}>{item.name}</li>
```

这种方式比较的麻烦，不方便进行阅读，而且还会导致代码比较的繁琐

##### 类名 -className

创建CSS文件编写样式代码

```css
.container {
    text-align: center
}
```

在js中进行引入，然后设置类名即可

```jsx
import './css/index.css'

<li className='container' key={item.id} style={{'color': 'red',"backgroundColor": 'pink'}}>{item.name}</li>
```

:::tip 小结
- JSX是React的核心内容
- JSX表示在JS代码中写HTML结构，是React声明式的体现
- 使用JSX配合嵌入的JS表达式、条件渲染、列表渲染、可以描述任意UI结构
- 推荐使用className的方式给JSX添加样式
- React完全利用JS语言自身的能力来编写UI，而不是造轮子增强HTML功能
:::
