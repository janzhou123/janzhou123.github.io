---
sidebar_label: React组件进阶(一)
title: React组件进阶(一)
sidebar_position: 4
hide_title: true
---

# React组件进阶

## 组件通讯介绍

组件是独立且封闭的单元，默认情况下，只能使用组件自己的数据。在组件化过程中，我们将一个完整的功能拆分成多个组件，以更好的完成整个应用的功能。而在这个过程中，多个组件之间不可避免的要共享某些数据。为了实现这些功能，就需要打破组件的独立封闭性，让其与外界沟通，这个过程就是组件通讯

## 组件的props（★★★）

### 基本使用

封闭的组件，要接受外部数据应该通过props来实现

props的作用：接收传递给组件的数据

传递数据：给组件标签添加属性

接收数据：函数组件通过 参数 props接收数据，类组件通过 this.props接收数据

函数组件获取

```jsx
function Hi(props) {
    console.log(props)
    return <p>the data: {props.name}</p>
}
```

类组件获取

```jsx
class Hi extends React.Component {
    render() {
        return (<p>the data: {this.props.name}</p>)
    }
}
```

:::tip 重点
- 可以给组件传递任意类型的数据
- props是只读属性，不能对值进行修改
- 注意：使用类组件时，如果写了构造函数，应该将props传递给super(),否则，无法在构造函数中获取到props，其他的地方是可以拿到的
:::

## 组件通讯的三种方式（★★★）

### 父组件传递数据给子组件

- 父组件提供要传递的state数据
- 给子组件标签添加属性，值为state中的数据
- 子组件中通过props接收父组件中传递的数据
  
![](images/父传子.png)

### 子组件传递数据给父组件

- 利用回调函数，父组件提供回调，子组件调用，将要传递的数据作为回调函数的参数
- 父组件提供一个回调函数，用来接收数据
- 将该函数作为属性的值，传递给子组件

![](images/子传父-父亲设置回调.png)

- 子组件通过props调用回调函数

![](images/子传父-调用回调.png)

### 兄弟组件传递

- 将共享状态(数据)提升到最近的公共父组件中，由公共父组件管理这个状态
- 这个称为**状态提升**
- 公共父组件职责：1. 提供共享状态 2.提供操作共享状态的方法
- 要通讯的子组件只需要通过props接收状态或操作状态的方法

![](images/兄弟传递.png)

#### 示例demo

- 定义布局结构，一个Counter里面包含两个子组件，一个是计数器的提示，一个是按钮

```jsx
class Counter extends React.Component {
    render() {
        return (<div>
            <Child1 />
            <Child2 />
        </div>
        )
    }
}
class Child1 extends React.Component {
    render() {
        return (
            <h1>计数器：</h1>
        )
    }
}
class Child2 extends React.Component {
    render() {
        return (
            <button>+1</button>
        )
    }
}
```

- 在父组件里定义共享状态，把这个状态传递给第一个子组件

```jsx
class Counter extends React.Component {
    // 提供共享的状态
    state = {
        count: 0
    }
    render() {
        return (<div>
            {/* 把状态提供给第一个子组件 */}
            <Child1 count={this.state.count}/>
            <Child2 />
        </div>
        )
    }
}
```

- 在第一个子组件里面就能通过props获取到

```jsx
class Child1 extends React.Component {
    render() {
        return (
            <h1>计数器：{this.props.count}</h1>
        )
    }
}
```

- 在父组件中提供共享方法，通过属性传递给第二个子组件，方便第二个子组件来进行调用

```jsx
    // 提供共享方法
    onIncrement = (res) => {
        // 只要第二个子组件调用了这个函数，就会执行里面代码
        this.setState({
            count: this.state.count + res
        })
    }
    render() {
        return (<div>
            ...
            {/* 把共享方法提供给第二个子组件 */}
            <Child2 onIncrement={this.onIncrement} />
        </div>
        )
    }
```

- 在第二个子组件里面通过props来获取到对应函数，然后进行调用

```jsx
class Child2 extends React.Component {
    handleClick = () => {
        // 这里一旦调用，就会执行父组件里面 onIncrement函数
        this.props.onIncrement(2)
    }
    render() {
        return (
            <button onClick={this.handleClick}>+</button>
        )
    }
}
```

## Context（★★★）

如果出现层级比较多的情况下（例如：爷爷传递数据给孙子），我们会使用Context来进行传递

作用： 跨组件传递数据

### 使用步骤

- 调用 `React.createContext()` 创建 Provider(提供数据) 和 Consumer(消费数据) 两个组件

![](images/创建Context.png)

- 使用Provider 组件作为父节点

![](images/provider.png)

- 设置value属性，表示要传递的数据

![](images/设置value属性.png)

- 哪一层想要接收数据，就用Consumer进行包裹，在里面回调函数中的参数就是传递过来的值

![](images/Comsumer.png)

:::tip 小结
- 如果两个组件相隔层级比较多，可以使用Context实现组件通讯
- Context提供了两个组件：Provider 和 Consumer
- Provider组件： 用来提供数据
- Consumer组件： 用来消费数据
:::

## props进阶

### children属性

- children属性： 表示组件标签的子节点，当组件标签有子节点时，props就会有该属性
- children属性与普通的props一样，值可以使任意值（文本、react元素、组件、甚至是函数）

![](images/props-children.png)



### props校验（★★★）

- 对于组件来说，props是外来的，无法保证组件使用者传入什么格式的数据，简单来说就是组件调用者可能不知道组件封装着需要什么样的数据
- 如果传入的数据不对，可能会导致报错
- 关键问题：组件的使用者不知道需要传递什么样的数据
- props校验：允许在创建组件的时候，指定props的类型、格式等

![](images/props-校验.png)

- 作用：捕获使用组件时因为props导致的错误，给出明确的错误提示，增加组件的健壮性

![](images/props-错误提示.png)

#### 使用步骤

- 安装包  `prop-types (yarn add prop-types | npm i props-types)`
- 导入prop-types 包
- 使用`组件名.propTypes={}` 来给组件的props添加校验规则
- 校验规则通过PropTypes对象来指定

![](images/propsTypes.png)



#### 常见的约束规则

- 创建的类型： `array、bool、func、number、object、string`
- React元素类型：`element`
- 必填项：`isRequired`
- 特定结构的对象： `shape({})`
- 更多的[约束规则](<https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html#proptypes>)

![](images/props-约束规则.png)

### props的默认值

- 场景：分页组件 -> 每页显示条数

![](images/props默认值.png)