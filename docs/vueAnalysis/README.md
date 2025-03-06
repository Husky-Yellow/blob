---
sidebar: auto
---

# Vue 源码分析
本篇`Vue2.0`源码分析文章由观看[Vue.js源码全方位深入解析](https://coding.imooc.com/class/228.html)视频，阅读[深入浅出Vue.js](https://www.ituring.com.cn/book/2675)书籍以及参考其他`Vue`源码分析博客而来，阅读视频和书籍请支持正版。

## 介绍

### Vue发展简史
* 2013年7月，`Vue.js`在`Github`上第一次提交，此时名字叫做`Element`，后来被改名为`Seed.js`，到现在的`Vue.js`。
* 2013年12月，`Github`发布`0.6`版本，并正式更名为`Vue.js`。
* 2014年2月，在`Hacker News`网站上时候首次公开。
* 2015年10月，`Vue.js`发布`1.0.0`版本。
* 2016年10月，`Vue.js`发布`2.0`版本。

### Vue版本变化
`Vue2.0`版本和`Vue1.0`版本之间虽然内部变化非常大，整个渲染层都重写了，但`API`层面的变化却很小，对开发者来说非常友好，另外`Vue2.0`版本还引入了很多特性：
* `Virtual Dom`虚拟DOM。
* 支持`JSX`语法。
* 支持`TypeScript`。
* 支持服务端渲染`ssr`。
* 提供跨平台能力`weex`。

**正确理解虚拟DOM**：`Vue`中的虚拟DOM借鉴了开源库[snabbdom](https://github.com/snabbdom/snabbdom)的实现，并根据自身特色添加了许多特性。引入虚拟DOM的一个很重要的好处是：绝大部分情况下，组件渲染变得更快了，而少部分情况下反而变慢了。引入虚拟DOM这项技术通常都是在解决一些问题，然而解决一个问题的同时也可能会引入其它问题，这种情况更多的是如何做权衡、如何做取舍。因此，一味的强调虚拟DOM在任何时候都能提高性能这种说法需要正确对待和理解。

**核心思想**：`Vue.js`两大核心思想是**数据驱动**和**组件化**，因此我们在介绍完源码目录设计和整体流程后，会先介绍这两方面。

## 源码目录设计和架构设计

### 源码目录设计
`Vue.js`源码目录设计如下：
```sh
|-- dist              # 构建目录
|-- flow              # flow的类型声明，类似于TypeScipt
|-- packages          # 衍生的npm包，例如vue-server-renderer和vue-template-compiler
|-- scripts           # 构建配置和构建脚本
|-- test              # 端到端测试和单元测试用例
|-- src               # 源代码
|   |-- compiler      # 编译相关代码
|   |-- core          # 核心代码
|   |-- platforms     # 跨平台
|   |-- server        # 服务端渲染
|   |-- sfc           # .vue文件解析逻辑
|   |-- shared        # 工具函数/共享代码
```
对以上目录简要做如下介绍：
* `dist`：`rollup`构建目录，里面存放了所有`Vue`构建后不同版本的文件。
* `flow`：它是Facebook出品的`JavaScript`静态类型检查工具，早期`Vue.js`选择了`flow`而不是现在的`TypeScript`来做静态类型检查，而在最新的`Vue3.0`版本则选择使用`TypeScript`来重写。
* `packages`：`Vue.js`衍生的其它`npm`包，它们在`Vue`构建时自动从源码中生成并且始终和`Vue.js`保持相同的版本，主要是`vue-server-renderer`和`vue-template-compiler`这两个包，其中最后一个包在我们使用脚手架生成项目，也就是使用`.vue`文件开发`Vue`项目时会使用到这个包。
* `scripts`：`rollup`构建配置和构建脚本，`Vue.js`能够通过不同的环境构建不同的版本的秘密都在这个目录下。
* `test`：`Vue.js`测试目录，自动化测试对于一个开源库来说是至关重要的，测试覆盖率在一定程度上是衡量一个库质量的一个重要指标。测试用例无论对于开发还是阅读源码，都是有很大益处的，其中通过测试用例去阅读`Vue`源码是普遍认为可行的一种方式。

* `src/compiler`：此目录包含了与`Vue.js`编译相关的代码，它包括：模板编译成 AST 抽象语法树、AST 抽象语法树优化和代码生成相关代码。编译的工作可以在构建时用`runtime-only`版本，借助`webpack`和`vue-loader`等工具或插件来进行编译。也可以在运行时，使用包含构建功能的`runtime + compiler`版本。显然，编译是一项比较消耗性能的工作，所以我们日常的开发中，更推荐使用`runtime-only`的版本开发(体积也更小)，也就是通过`.vue`文件的形式开发。

```js
// 需要使用带编译的版本
new Vue({
  data: {
    msg: 'hello,world'
  }
  template: '<div>{{msg}}</div>'
})

// 不需要使用带编译的版本
new Vue({
  data: {
    msg: 'hello,world'
  },
  render (h) {
    return h('div', this.msg)
  }
})
```
*  `src/core`：此目录包含了`Vue.js`的核心代码，包括：内置组件`keep-alive`、全局 API(`Vue.use`、`Vue.mixin`和`Vue.extend`等)、实例化、响应式相关、虚拟 DOM 和工具函数等。

```sh
|-- core
|   |-- components      # 内助组件
|   |-- global-api      # 全局API
|   |-- instance        # 实例化
|   |-- observer        # 响应式
|   |-- util            # 工具函数
|   |-- vdom            # 虚拟DOM
```
* `src/platform`：`Vue2.0`提供了跨平台的能力，在`React`中有`React Native`跨平台客户端，而在`Vue2.0`中其对应的跨平台就是`Weex`。

```js
|-- platform
|   |-- web      # web浏览器端
|   |-- weex     # native客户端
```

* `src/server`: `Vue2.0`提供服务端渲染的能力，所有跟服务端渲染相关的代码都在`server`目录下，此部分代码是运行在服务端，而非 Web 浏览器端。

* `src/sfc`：此目录的主要作用是如何把`.vue`文件解析成一个`JavaScript`对象。

* `src/shared`：此目录下存放了一些在 Web 浏览器端和服务端都会用到的共享代码。


### 架构设计
我们通过以上目录结构可以很容易的发现，`Vue.js`整体分为三个部分：**核心代码**、**跨平台相关**和**公共工具函数**。

同时其架构是分层的，最底层是一个构造函数(普通的函数)，最上层是一个入口，也就是将一个完整的构造函数导出给用户使用。在中间层，我们需要逐渐添加一些方法和属性，主要是原型`prototype`相关和全局API相关。

![Vue架构设计](https://gitee.com/husky-bear/picture-bed/raw/master/vueAnalysis/composition.png)

## Rollup构建
`Vue.js`通过`rollup`构建工具进行构建，它是一个类似于`webpack`的打包工具，区别于`webpack`它更适合一个`Library`库的打包。在学习`Vue.js`源码之前，我们有必要知道`Vue.js`是如何构建不同版本的。

## 从入口到Vue构造函数整体流程

在之前的介绍中，我们知道`Vue.js`内部会根据`Web浏览器`、`Weex`跨平台和`SSR服务端渲染`不同的环境寻找不同的入口文件，但其核心代码是在`src/core`目录下，我们这一节的主要目的是为了搞清楚从入口文件到`Vue`构造函数执行，这期间的整体流程。

### initGlobalAPI流程
我们会在`src/core/index.js`文件中看到如下精简代码：
```js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
initGlobalAPI(Vue)

export default Vue
```
在以上代码中，我们发现它引入了`Vue`随后调用了`initGlobalAPI()`函数，此函数的作用是挂载一些全局`API`方法。

![initGlobalAPI](https://gitee.com/husky-bear/picture-bed/raw/master/vueAnalysis/initGlobalAPI.png)

我们首先能在`src/core/global-api`文件夹下看到如下目录结构：
```sh
|-- global-api        
|   |-- index.js      # 入口文件
|   |-- assets.js     # 挂载filter、component和directive
|   |-- extend.js     # 挂载extend方法
|   |-- mixin.js      # 挂载mixin方法
|   |-- use.js        # 挂载use方法
```

随后在`index.js`入口文件中，我们能看到如下精简代码：
```js
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { observe } from 'core/observer/index'
import { extend, nextTick } from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  Vue.observable = (obj) => {
    observe(obj)
    return obj
  }

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
```
我们能从以上代码很清晰的看到在`index.js`入口文件中，会在`Vue`构造函数上挂载各种全局`API`函数，其中`set`、`delete`、`nextTick`和`observable`直接赋值为一个函数，而其他几种`API`则是调用了一个以`init`开头的方法，我们以`initAssetRegisters()`方法为例，它的精简代码如下：
```js
// ['component','directive', 'filter']
import { ASSET_TYPES } from 'shared/constants'

export function initAssetRegisters (Vue: GlobalAPI) {
  ASSET_TYPES.forEach(type => {
    Vue[type] = function () {
      // 省略了函数的参数和函数实现代码
    }
  })
}
```
其中`ASSET_TYPES`是一个定义在`src/shared/constants.js`中的一个数组，然后在`initAssetRegisters()`方法中遍历这个数组，依次在`Vue`构造函数上挂载`Vue.component()`、`Vue.directive()`和`Vue.directive()`方法，另外三种`init`开头的方法调用挂载对应的全局`API`是一样的道理：
```js
// initUse
export function initUse(Vue) {
  Vue.use = function () {}
}

// initMixin
export function initMixin(Vue) {
  Vue.mixin = function () {}
}

// initExtend
export function initExtend(Vue) {
  Vue.extend = function () {}
}
```

最后，我们发现还差一个`Vue.compile()`方法，它其实是在`runtime+compile`版本才会有的一个全局方法，因此它在`src/platforms/web/entry-runtime-with-compile.js`中被定义：
```js
import Vue from './runtime/index'
import { compileToFunctions } from './compiler/index'
Vue.compile = compileToFunctions
export default Vue
```

因此我们根据`initGlobalAPI()`方法的逻辑，可以得到如下流程图：
![initGlobalAPI流程图](https://gitee.com/husky-bear/picture-bed/raw/master/vueAnalysis/initGlobalAPIProcess.png)


### initMixin流程
在上一节我们讲到了`initGlobalAPI`的整体流程，这一节，我们来介绍`initMixin`的整体流程。首选，我们把目光回到`src/core/index.js`文件中：
```js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
initGlobalAPI(Vue)

export default Vue
```
我们发现，它从别的模块中引入了大`Vue`，那么接下来我们的首要任务就是揭开`Vue`构造函数的神秘面纱。

在看`src/core/instance/index.js`代码之前，我们发现`instance`目录结构如下：
```sh
|-- instance
|   |-- render-helpers      # render渲染相关的工具函数目录
|   |-- events.js           # 事件处理相关
|   |-- init.js             # _init等方法相关
|   |-- inject.js           # inject和provide相关
|   |-- lifecycle.js        # 生命周期相关
|   |-- proxy.js            # 代理相关
|   |-- render.js           # 渲染相关
|   |-- state.js            # 数据状态相关
|   |-- index.js            # 入口文件
```

可以看到，目录结构文件有很多，而且包含的面也非常杂，但我们现在只需要对我们最关心的几个部分做介绍：
* `events.js`：处理事件相关，例如：`$on`，`$off`，`$emit`以及`$once`等方法的实现。
* `init.js`：此部分代码逻辑包含了`Vue`从创建实例到实例挂载阶段的所有主要逻辑。
* `lifecycle.js`：生命周期相关，例如：`$destroy`、`$activated`和`$deactivated`。
* `state.js`：数据状态相关，例如：`data`、`props`以及`computed`等。
* `render.js`：渲染相关，其中最值得关注的是`Vue.prototype._render`渲染函数的定义。

在介绍了`instance`目录结构的及其各自的作用以后，我们再来看入口文件，其实入口文件这里才是`Vue`构造函数庐山真面目：
```js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

代码分析：
* `Vue`构造函数其实就是一个普通的函数，我们只能通过`new`操作符进行访问，既`new Vue()`的形式，`Vue`函数内部也使用了`instanceof`操作符来判断实例的父类是否为`Vue`构造函数，不是的话则在开发环境下输出一个警告信息。
* 除了声明`Vue`构造函数，这部分的代码也调用了几种`mixin`方法，其中每种`mixin`方法各司其职，处理不同的内容。

从以上代码中，我们能得到`src/core/instance/index.js`文件非常直观的代码逻辑流程图：

![instance流程](https://gitee.com/husky-bear/picture-bed/raw/master/vueAnalysis/instance.png)

接下来我们的首要任务是弄清楚`_init()`函数的代码逻辑以及`initMixin`的整体流程。我们从上面的代码发现，在构造函数内部会调用`this._init()`方法，也就是说：
```js
// 实例化时，会调用this._init()方法。
new Vue({
  data: {
    msg: 'Hello, Vue.js'
  }
})
```

然后，我们在`init.js`中来看`initMixin()`方法是如何被定义的：
```js
export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    // 省略代码
  }
}
```
我们可以发现，`initMixin()`方法的主要作用就是在`Vue.prototype`上定义一个`_init()`实例方法，接下来我们来看一下`_init()`函数的具体实现逻辑：
```js
Vue.prototype._init = function (options) {
    const vm = this
    // 1. 合并配置
    if (options && options._isComponent) {
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }

    // 2.render代理
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }

    // 3.初始化生命周期、初始化事件中心、初始化inject，初始化state、初始化provide、调用生命周期
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm)
    initState(vm)
    initProvide(vm)
    callHook(vm, 'created')

    // 4.挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
```
因为我们是要分析`initMixin`整体流程，对于其中某些方法的具体实现逻辑会在后续进行详细的说明，因此我们可以从以上代码得到`initMixin`的整体流程图。
zz


### stateMixin流程
`stateMixin`主要是处理跟实例相关的属性和方法，它会在`Vue.prototype`上定义实例会使用到的属性或者方法，这一节我们主要任务是弄清楚`stateMixin`的主要流程。在`src/core/instance/state.js`代码中，它精简后如下所示：
```js
import { set, del } from '../observer/index'
export function stateMixin (Vue) {
  // 定义$data, $props
  const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  // 定义$set, $delete, $watch
  Vue.prototype.$set = set
  Vue.prototype.$delete = del
  Vue.prototype.$watch = function() {}
}
```
我们可以从上面代码中发现，`stateMixin()`方法中在`Vue.prototype`上定义的几个属性或者方法，全部都是和响应式相关的，我们来简要分析一下以上代码：
* `$data和$props`：根据以上代码，我们发现`$data`和`$props`分别是`_data`和`_props`的访问代理，从命名中我们可以推测，以下划线开头的变量，我们一般认为是私有变量，然后通过`$data`和`$props`来提供一个对外的访问接口，虽然可以通过属性的`get()`方法去取，但对于这两个私有变量来说是并不能随意`set`，对于`data`来说不能替换根实例，而对于`props`来说它是只读的。因此在原版源码中，还劫持了`set()`方法，当设置`$data`或者`$props`时会报错：
```js
if (process.env.NODE_ENV !== 'production') {
  dataDef.set = function () {
    warn(
      'Avoid replacing instance root $data. ' +
      'Use nested data properties instead.',
      this
    )
  }
  propsDef.set = function () {
    warn(`$props is readonly.`, this)
  }
}
```
* `$set`和`$delete`：`set`和`delete`这两个方法被定义在跟`instance`目录平级的`observer`目录下，在`stateMixin()`中，它们分别赋值给了`$set`和`$delete`方法，而在`initGlobalAPI`中，也同样使用到了这两个方法，只不过一个是全局方法，一个是实例方法。

* `$watch`：在`stateMixin()`方法中，详细实现了`$watch()`方法，此方法实现的核心是通过一个`watcher`实例来监听。当取消监听时，同样是使用`watcher`实例相关的方法，关于`watcher`我们会在后续响应式章节详细介绍。
```js
Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value)
      } catch (error) {
        handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }
    return function  () {
      watcher.teardownunwatchFn()
    }
  }
```
在以上代码分析完毕后，我们可以得到`stateMixin`如下流程图：
<div style="text-align: center">
  <img src="https://gitee.com/husky-bear/picture-bed/raw/master/vueAnalysis/stateMixin.png" alt="stateMixi流程" />
</div>

### eventsMixin流程
在使用`Vue`做开发的时候，我们一定经常使用到`$emit`、`$on`、`$off`和`$once`等几个实例方法，`eventsMixin`主要做的就是在`Vue.prototype`上定义这四个实例方法：
```js
export function eventsMixin (Vue) {
  // 定义$on
  Vue.prototype.$on = function (event, fn) {}

  // 定义$off
  Vue.prototype.$off = function (event, fn) {}

  // 定义$once
  Vue.prototype.$once = function (event, fn) {}

  // 定义$emit
  Vue.prototype.$emit = function (event) {}
}
```
通过以上代码，我们发现`eventsMixin()`所做的事情就是使用**发布-订阅**模式来处理事件，接下来让我们先使用**发布-订阅**实现自己的事件中心，随后再来回顾源码。
