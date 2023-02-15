---
sidebar_label: React组件
sidebar_position: 3
hide_title: true
---

## React组件

:::tip 重点
- 组件是React的一等公民，使用React就是在用组件
- 组件表示页面中的部分功能
- 组合多个组件实现完整的页面功能
- 特点：可复用、独立、可组合
:::

## 组件的创建方式

### 函数式组件

:::tip 重点
- 函数组件：使用JS的函数创建组件
- **约定1：**函数名称必须以大写字母开头
- **约定2：**函数组件必须有返回值，表示该组件的结构
- 如果返回值为null，表示不渲染任何内容
:::

编写函数组件

```jsx
function HelloFunc() {
    return (
        <div>this is function component</div>
    )
}
```

利用`ReactDOM.render()`进行渲染

```jsx
ReactDOM.render(<HelloFunc />,document.getElementById('root'))
```

### 类组件

:::tip 重点
- 使用ES6语法的class创建的组件
- 约定1：类名称也必须要大写字母开头
- 约定2：类组件应该继承`React.Component`父类，从而可以使用父类中提供的方法或者属性
- 约定3：类组件必须提供 render 方法
- 约定4：render方法中必须要有return返回值
:::

创建class类，继承`React.Component`，在里面提供render方法，在return里面返回内容

```jsx
class HelloClass extends React.Component{
    render(){
        return (
            <div>this is class component</div>
        )
    }
}
```

通过ReactDOM进行渲染

```jsx
ReactDOM.render(<HelloClass />,document.getElementById('root'))
```

## 抽离成单独的JS文件

:::tip 重点
- 思考：项目中组件多了之后，该如何组织这些组件？
- 选择一：将所有的组件放在同一个JS文件中
- 选择二：将每个组件放到单独的JS文件中
- **组件作为一个独立的个体，一般都会放到一个单独的JS文件中**
:::

- 创建 HelloClass.js
- 在 HelloClass.js 中导入React，创建组件，在 HelloClass.js中导出

```jsx
import React from 'react'

export default class HelloClass extends React.Component {
    render(){
        return (
            <div>单独抽离出来的 HelloClass</div>
        )
    }
}
```

- 在index.js中导入 HelloClass 组件，渲染到页面

```jsx
import Hello from './js/HelloClass'
ReactDOM.render(<HelloClass />,document.getElementById('root'))
```

## React事件处理

### 事件绑定

:::tip 重点
- React事件绑定语法与DOM事件语法相似
- 语法：on+事件名称=事件处理函数，比如  onClick = function(){}
- 注意：React事件采用驼峰命名法
:::

```jsx
export default class extends React.Component {
    clickHandle(e){
        console.log('click')
    }
    render(){
        return (
            <div><button onClick = {this.clickHandle}>click</button></div>
        )
    }
}
```

:::tip 小结
- 在React中绑定事件与原生很类似
- 需要注意点在于，在React绑定事件需要遵循驼峰命名法
- 类组件与函数组件绑定事件是差不多的，只是在类组件中绑定事件函数的时候需要用到this，代表指向当前的类的引用，在函数中不需要调用this
:::

### 事件对象

:::tip 重点
- 可以通过事件处理函数的参数获取到事件对象
- React中的事件对象叫做：合成事件
- 合成事件：兼容所有浏览器，无需担心跨浏览器兼容问题
- 除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 `stopPropagation()`和 `preventDefault()`
- 如果你想获取到原生事件对象，可以通过 `nativeEvent` 属性来进行获取
:::

```jsx
export default class extends React.Component {
    clickHandle(e){
        // 获取原生事件对象
        console.log(e.nativeEvent)
    }
    render(){
        return (
            <div><button onClick = {this.clickHandle}>点我点我点我</button></div>
        )
    }
}
```

### 支持的事件

- Clipboard Events  剪切板事件

  - 事件名 ：onCopy onCut onPaste
  - 属性     ：DOMDataTransfer clipboardData

- compositionEvent  复合事件

  - 事件名： onCompositionEnd onCompositionStart onCompositionUpdate
  - 属性： string data

- Keyboard Events  键盘事件

  - 事件名：onKeyDown onKeyPress onKeyUp
  - 属性： 例如 number keyCode  太多就不一一列举

- Focus Events  焦点事件  （这些焦点事件在 React DOM 上的所有元素都有效，不只是表单元素）

  - 事件名： onFocus onBlur
  - 属性： DOMEventTarget relatedTarget

- Form Events  表单事件

  - 事件名： onChange onInput onInvalid onSubmit

- Mouse Events  鼠标事件

  - 事件名：

    ```react
    onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
    onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
    onMouseMove onMouseOut onMouseOver onMouseUp
    ```

- Pointer Events  指针事件

  - 事件名：

    ```react
    onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
    onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
    ```

- Selection Events  选择事件

  - 事件名：onSelect

- Touch Events  触摸事件

  - 事件名：onTouchCancel onTouchEnd onTouchMove onTouchStart

- UI Events  UI 事件

  - 事件名： onScroll

- Wheel Events  滚轮事件

  - 事件名：onWheel

  - 属性： 

    ```react
    number deltaMode
    number deltaX
    number deltaY
    number deltaZ
    ```

- Media Events  媒体事件

  - 事件名：

    ```react
    onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
    onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
    onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
    onTimeUpdate onVolumeChange onWaiting
    ```

- Image Events 图像事件

  - 事件名：onLoad onError

- Animation Events 动画事件

  - 事件名：onAnimationStart onAnimationEnd onAnimationIteration

- Transition Events 过渡事件

  - 事件名：onTransitionEnd

- Other Events  其他事件

  - 事件名： onToggle

## 有状态组件和无状态组件

:::tip 重点
- 函数组件又叫做 无状态组件，类组件又叫做 有状态组件
- 状态(state) 即数据
- 函数组件没有自己的状态，只负责数据展示
- 类组件有自己的状态，负责更新UI，让页面动起来
:::

## State和SetState

### state基本使用

:::tip 重点
- **状态(state)即数据**，是组件内部的私有数据，只能在组件内部使用
- state的值是对象，表示一个组件中可以有多个数据
- 通过this.state来获取状态
:::

```jsx
export default class extends React.Component {
    constructor(){
        super()

        // 第一种初始化方式
        this.state = {
            count : 0
        }
    }
    // 第二种初始化方式
    state = {
        count:1
    }
    render(){
        return (
            <div>计数器 :{this.state.count}</div>
        )
    }
}
```

### setState() 修改状态

:::tip 重点
- 状态是可变的
- 语法：this.setState({要修改的数据})
- **注意：不要直接修改state中的值，这是错误的**
- setState() 作用：1.修改 state 2.更新UI
- 思想：数据驱动视图
:::

```jsx
export default class extends React.Component {
    // 第二种初始化方式
    state = {
        count:1
    }
    render(){
        return (
            <div>
                <div>计数器 :{this.state.count}</div>
                <button onClick={() => {
                     this.setState({
            	 		count: this.state.count+1
           			  })   
                }}>+1</button>
            </div>
        )
    }
}
```

:::tip 小结
- 修改state里面的值我们需要通过 this.setState() 来进行修改
- React底层会有监听，一旦我们调用了setState导致了数据的变化，就会重新调用一次render方法，重新渲染当前组件
:::

## 事件绑定this指向

### 箭头函数

:::tip 重点
- 利用箭头函数自身不绑定this的特点
:::
  
### 利用bind方法

利用原型bind方法是可以更改函数里面this的指向的，所以我们可以在构造中调用bind方法，然后把返回的值赋值给我们的函数即可

```jsx
class App extends React.Component {
  constructor() {
    super()
	...
    // 通过bind方法改变了当前函数中this的指向
    this.onIncrement = this.onIncrement.bind(this)
  }
  // 事件处理程序
  onIncrement() {
    ...
  }

  render() {
    ...
  }
}
```

### class的实例方法

:::tip 重点
- 利用箭头函数形式的class实例方法
- 注意：该语法是实验性语法，但是，由于babel的存在可以使用
:::

```jsx
  // 事件处理程序
  onIncrement = () => {
    console.log('事件处理程序中的this：', this)
    this.setState({
      count: this.state.count + 1
    })
  }
```

:::tip 小结
- 推荐：使用class的实例方法，也是依赖箭头函数不绑定this的特征
:::


## 表单处理

### 受控组件

:::tip 重点
- HTML中的表单元素是可输入的，也就是有自己的可变状态
- 而React中可变状态通常保存在state中，并且只能通过`setState()` 方法来修改
- React讲state与表单元素值value绑定在一起，有state的值来控制表单元素的值
- 受控组件：值受到react控制的表单元素
:::

#### 使用步骤

- 在state中添加一个状态，作为表单元素的value值
- 给表单元素绑定change事件，将表单元素的值设置为state的值

```jsx
class App extends React.Component {
    constructor(){
        super()
        this.inputChange = this.inputChange.bind(this)
    }
    state = {
        txt : ''
    }
    inputChange(e){
       this.setState({
           txt: e.target.value
       })
    }
    render(){
        console.log(this.state);
        
        return (
            <div>
                {/* 把state的值设置给输入框的value，绑定change事件，这样用户在输入内容的时候调用相应函数，在函数里面把当前设置的值赋值给state，从而达到数据的统一 */}
                <input type="text" value={this.state.txt} onChange={this.inputChange}/>
            </div>
        )
    }
}
ReactDOM.render(<App />,document.getElementById('root'))
```

#### 多表单元素优化

- 问题：每个表单元素都有一个单独的事件处理函数，这样太繁琐
- 优化：使用一个事件处理程序同时处理多个表单元素

##### 步骤

- 给表单元素添加name属性（用来区分是哪一个表单），名称与state相同（用来更新数据的）
- 根据表单内容来获取对应值
- 在change事件处理程序中通过 [name] 来修改对应的state

```jsx
inputChange(e){
   let target = e.target;
   let value = target.type == 'checkbox' ? target.checked : target.value;
   this.setState({
       [e.target.name]: value
   })
}
<input type="text" value={this.state.txt} name="txt" onChange={this.inputChange}/>
<input type="checkbox" value={this.state.isChecked} name="isChecked" onChange={this.inputChange}/>
```

### 非受控组件 （了解）

- 说明：借助于ref，使用元素DOM方式获取表单元素值
- ref的作用：获取DOM或者组件

#### 使用步骤

- 调用 `React.createRef()` 方法创建ref对象
- 将创建好的 ref 对象添加到文本框中
- 通过ref对象获取到文本框的值

```jsx
class App extends React.Component {
    constructor(){
        super()
        
        //创建 ref
        this.txtRef = React.createRef()
    }
    // 获取文本框的值
    getTxt =() => {
        console.log(this.txtRef.current.value)
    }
    render(){
        return (
          <div>
            <input type ="text" ref={this.txtRef} />
            <button onClick ={this.getTxt}>获取值</button>
          </div>
        )
    }
}
```