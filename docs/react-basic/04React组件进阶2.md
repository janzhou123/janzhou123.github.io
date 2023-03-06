---
sidebar_label: React组件进阶(二)
title: React组件进阶(二)
sidebar_position: 5
hide_title: true
---

## 组件生命周期（★★★）

### 概述

意义：组件的生命周期有助于理解组件的运行方式，完成更复杂的组件功能、分析组件错误原因等

组件的生命周期： 组件从被创建到挂载到页面中运行，再到组件不在时卸载的过程

生命周期的每个阶段总是伴随着一些方法调用，这些方法就是生命周期的钩子函数

构造函数的作用：为开发人员在不同阶段操作组件提供了实际

### 生命周期阶段

![](images/生命周期.png)

#### 创建时（挂载阶段）

- 执行时机：组件创建时（页面加载时）
- 执行顺序

![](images/创建时-函数执行顺序.png)

![](images/创建时-函数的作用.png)

#### 更新时

执行时机：`setState()、 forceUpdate()、 组件接收到新的props`

说明：以上三者任意一种变化，组件就会重新渲染

执行顺序：

![](images/更新时.png)

![](images/更新时-函数作用.png)

#### 卸载时

执行时机：组件从页面中消失

作用：用来做清理操作

![](images/卸载时.png)

#### 不常用的钩子函数

##### 旧版的生命周期钩子函数

![](images/旧版生命周期函数.png)

##### 新版完整生命会走棋钩子函数

![](images/新版生命周期函数.png)

###### `getDerivedStateFromProps()`

- **`getDerivedStateFromProps`** 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容
- 不管原因是什么，都会在*每次*渲染前触发此方法

###### `shouldComponentUpdate()`

- 根据 **`shouldComponentUpdate()`** 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染
- 当 props 或 state 发生变化时，**`shouldComponentUpdate()`** 会在渲染执行之前被调用。返回值默认为 true

###### `getSnapshotBeforeUpdate()`

- **`getSnapshotBeforeUpdate()`** 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 **`componentDidUpdate()`**
- 此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等

# render-props 模式 （★★★）

## React 组件复用概述

- 思考：如果两个组件中的部分功能相似或相同，该如何处理？
- 处理方式：复用相似的功能
- 复用什么？
  - state
  - 操作 state 的方法
- 两种方式：
  - render props 模式
  - 高阶组件（HOC）
- 注意： 这两种方式不是新的 API，而是利用 React 自身特点的编码技巧，演化而成的固定模式

### 思路分析

- 思路：将要复用的 state 和操作 state 的方法封装到一个组件中

- 如何拿到该组件中复用的 state

  - 在使用组件时，添加一个值为函数的 prop，通过函数参数来获取

    ![](images/render-props-01.png)

- 如何渲染到任意的 UI

  - 使用该函数的返回值作为要渲染的 UI 内容

    ![](images/render-props-02.png)

### 使用步骤

- 创建 Mouse 组件，在组件中提供复用的逻辑代码
- 将要复用的状态作为 props.render(state)方法的参数，暴露到组件外部
- 使用 props.render() 的返回值作为要渲染的内容

![](images/render-props模式-01.png)

```jsx
class Mouse extends React.Component {
  // 鼠标位置状态
  state = {
    x: 0,
    y: 0,
  };

  // 监听鼠标移动事件
  componentDidMount() {
    window.addEventListener("mousemove", this.handleMouseMove);
  }
  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  };
  render() {
    // 向外界提供当前子组件里面的数据
    return this.props.render(this.state);
  }
}
class App extends React.Component {
  render() {
    return (
      <div>
        App
        <Mouse
          render={(mouse) => {
            return (
              <p>
                X{mouse.x}Y{mouse.y}
              </p>
            );
          }}
        />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
```

### children 代替 render 属性

- 注意：并不是该模式叫 render props 就必须使用名为 render 的 prop，实际上可以使用任意名称的 prop
- 把 prop 是一个函数并且告诉组件要渲染什么内容的技术叫做： render props 模式
- 推荐：使用 childre 代替 render 属性

![](images/render-props-children模式.png)

### 优化代码

- 推荐给 render props 模式添加 props 校验

![](images/优化-添加校验.png)

-

![](images/优化-移除事件绑定.png)

## 高阶组件 （★★★）

### 概述

- 目的：实现状态逻辑复用
- 采用 包装模式
- 手机：获取保护功能
- 手机壳：提供保护功能
- 高阶组件就相当于手机壳，通过包装组件，增强组件功能

![](images/手机壳.png)

### 思路分析

- 高阶组件(HOC、Higher-Order Component) 是一个函数，接收要包装的组件，返回增强后的组件

![](images/高阶组件-函数.png)

- 高阶组件内部创建了一个类组件，在这个类组件中提供复用的状态逻辑代码，通过 prop 将复用的状态传递给被包装组件`WrappedComponent`

![](images/高阶组件-类组件内部实现.png)

### 使用步骤

- 创建一个函数，名称约定以 with 开头
- 指定函数参数，参数应该以大写字母开头
- 在函数内部创建一个类组件，提供复用的状态逻辑代码，并返回
- 在该组件中，渲染参数组件，同时将状态通过 prop 传递给参数组件
- 调用该高阶组件，传入要增强的组件，通过返回值拿到增强后的组件，并将其渲染到页面

**包装函数**

```jsx
// 定义一个函数，在函数内部创建一个相应类组件
function withMouse(WrappedComponent) {
  // 该组件提供复用状态逻辑
  class Mouse extends React.Component {
    state = {
      x: 0,
      y: 0,
    };
    // 事件的处理函数
    handleMouseMove = (e) => {
      this.setState({
        x: e.clientX,
        y: e.clientY,
      });
    };
    // 当组件挂载的时候进行事件绑定
    componentDidMount() {
      window.addEventListener("mousemove", this.handleMouseMove);
    }
    // 当组件移除时候解绑事件
    componentWillUnmount() {
      window.removeEventListener("mousemove", this.handleMouseMove);
    }
    render() {
      // 在render函数里面返回传递过来的组件，把当前组件的状态设置进去
      return <WrappedComponent {...this.state} />;
    }
  }
  return Mouse;
}
```

**哪个组件需要加强，通过调用`withMouse`这个函数，然后把返回的值设置到父组件中即可**

```jsx
function Position(props) {
  return (
    <p>
      X:{props.x}
      Y:{props.y}
    </p>
  );
}
// 把position 组件来进行包装
let MousePosition = withMouse(Position);

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        高阶组件
        <MousePosition></MousePosition>
      </div>
    );
  }
}
```

### 设置`displayName`

- 使用高阶组件存在的问题：得到两个组件的名称相同
- 原因：默认情况下，React 使用组件名称作为`displayName`
- 解决方式：为高阶组件设置`displayName`，便于调试时区分不同的组件
- `displayName的作用：用于设置调试信息(React Developer Tools信息)`
- 设置方式：

![](images/高阶组件-displayName.png)

### 传递 props

- 问题：如果没有传递 props，会导致 props 丢失问题
- 解决方式： 渲染`WrappedComponent`时，将 state 和 props 一起传递给组件

![](images/传递props.png)

:::tip 小结

- 组件通讯是构建 React 应用必不可少的一环
- props 的灵活性让组件更加强大
- 状态提升是 React 组件的常用模式
- 组件生命周期有助于理解组件的运行过程
- 钩子函数让开发者可以在特定的时机执行某些功能
- `render props` 模式和高阶组件都可以实现组件状态逻辑的复用
- 组件极简模型： `(state,props) => UI`
  :::

## React 原理

### `setState()`说明 （★★★）

#### 更新数据

- `setState()`更新数据是异步的
- 注意：使用该语法，后面的`setState`不要依赖前面`setState`的值
- 多次调用`setState`，只会触发一次 render

#### 推荐语法

- 推荐：使用 `setState((state,props) => {})` 语法
- 参数 state： 表示最新的 state
- 参数 props： 表示最新的 props

![](images/推荐语法.png)

#### 第二个参数

- 场景：在状态更新(页面完成重新渲染)后立即执行某个操作
- 语法：`setState(update[,callback])`

![](images/第二个参数.png)

#### JSX 语法的转化过程 （★★★）

- JSX 仅仅是`createElement()` 方法的语法糖(简化语法)
- JSX 语法被 @babel/preset-react 插件编译为`createElement()` 方法
- React 元素： 是一个对象，用来描述你希望在屏幕上看到的内容

![](images/语法糖.png)

### 组件更新机制

- setState() 的两个作用

  - 修改 state
  - 更新组件

- 过程：父组件重新渲染时，也会重新渲染子组件，但只会渲染当前组件子树（当前组件以其所有子组件）

![](images/组件更新.png)

### 组件性能优化

#### 减轻 state

- 减轻 state：只存储跟组件渲染相关的数据（比如：count/ 列表数据 /loading 等）
- 注意：不用做渲染的数据不要放在 state 中
- 对于这种需要在多个方法中用到的数据，应该放到 this 中

![](images/减轻state.png)

#### 避免不必要的重新渲染

- 组件更新机制：父组件更新会引起子组件也被更新，这种思路很清晰
- 问题：子组件没有任何变化时也会重新渲染
- 如果避免不必要的重新渲染？
- 解决方式：使用钩子函数 shouldComponentUpdate(nextProps, nextState)
  - 在这个函数中，nextProps 和 nextState 是最新的状态以及属性
- 作用：这个函数有返回值，如果返回 true，代表需要重新渲染，如果返回 false，代表不需要重新渲染
- 触发时机：更新阶段的钩子函数，组件重新渲染前执行(shouldComponentUpdate => render)

![](images/shouldComponentUpdata.png)

#### 随机数案例

需求：随机生成数字，显示在页面，如果生成的数字与当前显示的数字相同，那么就不需要更新 UI，反之更新 UI。

利用 nextState 参数来判断当前组件是否需要更新

```jsx
class App extends React.Component {
  state = {
    number: 0,
  };
  // 点击事件，每次点击生成一个随机数
  hanldeBtn = () => {
    this.setState({
      number: Math.floor(Math.random() * 3),
    });
  };
  // 将要更新UI的时候会执行这个钩子函数
  shouldComponentUpdate(nextProps, nextState) {
    // 判断一下当前生成的 值是否与页面的值相等
    if (nextState.number !== this.state.number) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <div>
        随机数：{this.state.number} <br />
        <button onClick={this.hanldeBtn}>生成随机数</button>
      </div>
    );
  }
}
```

利用 props 参数来判断是否需要进行更新

```jsx
class App extends React.Component {
  state = {
    number: 0,
  };
  // 点击事件，每次点击生成一个随机数
  hanldeBtn = () => {
    this.setState({
      number: Math.floor(Math.random() * 3),
    });
  };

  render() {
    return (
      <div>
        <NumberBox number={this.state.number} />
        <button onClick={this.hanldeBtn}>生成随机数</button>
      </div>
    );
  }
}
class NumberBox extends React.Component {
  // 将要更新UI的时候会执行这个钩子函数
  shouldComponentUpdate(nextProps, nextState) {
    // 判断一下当前生成的 值是否与页面的值相等
    if (nextProps.number !== this.props.number) {
      return true;
    }
    return false;
  }
  render() {
    return <h1>随机数：{this.props.number} </h1>;
  }
}
```

### 纯组件

#### 作用以及使用

- 纯组件： PureComponent 与 React.Component 功能相似
- 区别： PureComponent 内部自动实现了 shouldComponentUpdate 钩子，不需要手动比较
- 原理：纯组件内部通过分别比对前后两次 props 和 state 的值，来决定是否重新渲染组件

![](images/PureComponent.png)

#### 实现原理

- 说明：纯组件内部的对比是 shallow compare（浅层对比）
- 对于值类型来说：比较两个值是否相同

![](images/值类型比对.png)

- 引用类型：只比对对象的引用地址是否相同

![](images/引用类型比对.png)

- 注意：state 或 props 中属性值为引用类型时，应该创建新数据，不要直接修改原数据

![](images/注意点.png)

### 虚拟 DOM 和 Diff 算法

- React 更新视图的思想是：只要 state 变化就重新渲染视图
- 特点：思路非常清晰
- 问题：组件中只有一个 DOM 元素需要更新时，也得把整个组件的内容重新渲染吗？ 不是这样的
- 理想状态：部分更新，只更新变化的地方
- React 运用的核心点就是 虚拟 DOM 配合 Diff 算法

#### 虚拟 DOM

本质上就是一个 JS 对象，用来描述你希望在屏幕上看到的内容

![](images/虚拟DOM.png)

#### Diff 算法

执行过程

- 初次渲染时，React 会根据初始化的 state（model），创建一个虚拟 DOM 对象（树）
- 根据虚拟 DOM 生成真正的 DOM，渲染到页面
- 当数据变化后(setState())，会重新根据新的数据，创建新的虚拟 DOM 对象（树）
- 与上一次得到的虚拟 DOM 对象，使用 Diff 算法比对（找不同），得到需要更新的内容
- 最终，React 只将变化的内容更新（patch）到 DOM 中，重新渲染到页面

![](images/diff算法.png)

#### 代码演示

- 组件 render()调用后，根据状态和 JSX 结构生成虚拟 DOM 对象(render()方法的调用并不意味着浏览器进行渲染，render 方法调用时意味着 Diff 算法开始比对了)
- 示例中，只更新 p 元素的文本节点内容
- 初次渲染的 DOM 对象

![](images/初次的虚拟DOM对象.png)

- 数据更新之后的虚拟 DOM 对象

![](images/更新后的虚拟DOM对象.png)

:::tip 小结

- 工作角度：应用第一，原理第二
- 原理有助于更好的理解 React 的自身运行机制
- setState() 异步更新数据
- 父组件更新导致子组件更新，纯组件提升性能
- 思路清晰简单为前提，虚拟 DOM 和 Diff 保效率（渲染变化的组件）
- 虚拟 DOM -> state + JSX
- 虚拟 DOM 最大的特点是 脱离了浏览器的束缚，也就是意味着只要是能支持 js 的地方都可以用到 react，所以为什么说 react 是可以进行跨平台的开发
  :::
