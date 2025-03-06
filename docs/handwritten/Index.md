---
sidebar: auto
---
# JavaScript手写题

## 手写setInterval
::: tip
用`requestAnimationFrame`实现`setInterval`方法
:::
```js
// 手写
function mySetInterval(callback, interval) {
  var timer = null;
  var now = Date.now;
  var startTime = now();
  var endTime = startTime;
  var loop = function() {
    timer = requestAnimationFrame(loop);
    endTime = now();
    if(endTime - startTime >=interval) {
      startTime = endTime = now();
      callback && callback(timer);
    }
  }

  timer = requestAnimationFrame(loop);
  return timer;
}

// 测试：输出三次'超级定时器已部署'自动停止
var count = 0;
mySetInterval(function(timer){
  console.log('超级定时器已部署');
  count++;
  if(count>=3) {
    cancelAnimationFrame(timer);
  }
}, 500)
```

## 手写call、apply和bind方法
### 手写call
> **call 函数的实现步骤：**
> 1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
> 2. 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
> 3. 处理传入的参数，截取第一个参数后的所有参数。
> 4. 将函数作为上下文对象的一个属性。
> 5. 使用上下文对象来调用这个方法，并保存返回结果。
> 6. 删除刚才新增的属性。
> 7. 返回结果。
```js
Function.prototype.myCall = function(context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
      result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
};
function foo(){
  console.log(this.age);
}
var obj = {
  age: 101
}
foo.myCall(obj); // 输出 101
```

### 手写apply
> **apply 函数的实现步骤：**
> 1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
> 2. 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
> 3. 将函数作为上下文对象的一个属性。
> 4. 判断参数值是否传入
> 5. 使用上下文对象来调用这个方法，并保存返回结果。
> 6. 删除刚才新增的属性
> 7. 返回结果
```js
Function.prototype.myApply = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let result = null;
  // 判断 context 是否存在，如果未传入则为 window
  context = context || window;
  // 将函数设为对象的方法
  context.fn = this;
  // 调用方法
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 将属性删除
  delete context.fn;
  return result;
};
function foo(){
  console.log(this.age);
}
var obj = {
  age: 101
}
foo.myApply(obj); // 输出101
```

### 手写bind
> **bind 函数的实现步骤：**
> 1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
> 2. 保存当前函数的引用，获取其余传入参数值。
> 3. 创建一个函数返回
> 4. 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。
```js
Function.prototype.myBind = function(context) {
    // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 获取参数
  var args = [...arguments].slice(1),
      fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
}
function foo() {
  console.log(this.age);
}
var obj = {
  age: 121
}
var newFunc = foo.myBind(obj);
newFunc(); // 输出121
```

## 手写Promise
**简易Promise：** 。
[gitee地址](https://gitee.com/husky-bear/promise/blob/master/LetPromise.js#L1)
```js
class MyPromise {
  //定义 MyPromise 的三种状态
  static PENDING = "pending";
  static RESOLVED = "resolved";
  static REJECTED = "rejected";
  constructor(excutor) {
      this.state = MyPromise.PENDING;
      this.value = "";
      this.reason = "";
      //将成功的回调函数缓存在 resolvedCallback 中
      this.resolvedCallback = [];
      //将失败的回调函数缓存在 rejectedCallback 中
      this.rejectedCallback = [];
      let resolve = (value) => {
          //只有 PENDING 状态才可以被修改，保证 MyPromise 状态的不可逆
          if (this.state === MyPromise.PENDING) {
              this.state = MyPromise.RESOLVED;
              this.value = value;
              this.resolvedCallback.forEach(fn => fn(value));
          }
      }
      let reject = (reason) => {
          if (this.state === MyPromise.PENDING) {
              this.state = MyPromise.REJECTED;
              this.reason = reason;
              this.rejectedCallback.forEach(fn => fn(reason));
          }
      }
      try {
          //同步执行传进来的 excutor 函数
          excutor(resolve, reject);
      } catch (e) {
          console.log("excutor error", e);
          reject(e);
      }
  }
  then(onResolved, onRejected) {
      //穿透传递
      if (typeof onResolved !== "function") {
          onResolved = value => value;
      }
      if (typeof onRejected !== "function") {
          onRejected = reason => reason;
      }
      //返回一个新的 MyPromise 实例
      return new MyPromise((resolve, reject) => {
           // 异步代码，then 方法比 resolve 先执行的。回调函数要缓存起来
          if (this.state === MyPromise.PENDING) {
              this.resolvedCallback.push(() => {
                  const result = onResolved(this.value);
                  if (result instanceof MyPromise) {
                      result.then(resolve, reject);
                  } else {
                      resolve(result);
                  }
              })
              this.rejectedCallback.push(() => {
                  const result = onRejected(this.reason);
                  if (result instanceof MyPromise) {
                      result.then(resolve, reject);
                  } else {
                      resolve(result);
                  }
              })
          }
          //说明都是同步代码，resolve方法已经执行完了
          if (this.state === MyPromise.RESOLVED) {
              setTimeout(() => {
                  const result = onResolved(this.value);
                  if (result instanceof MyPromise) {
                      result.then(resolve, reject);
                  } else {
                      resolve(result);
                  }
              })
          }
          //说明都是同步代码，rejected方法已经执行完了
          if (this.state === MyPromise.REJECTED) {
              setTimeout(() => {
                  const result = onRejected(this.reason);
                  if (result instanceof MyPromise) {
                      result.then(resolve, reject);
                  } else {
                      resolve(result);
                  }
              })
          }
      })
  }
  //resolve方法
  static resolve(promise) {
      return new MyPromise((resolve, reject) => {
          if (promise instanceof MyPromise) {
              //promise实例 原封不动
              promise.then(resolve, reject);
          } else {
              resolve(promise);
          }
      })
  }
  //reject
  static reject(promise) {
      return new MyPromise((resolve, reject) => {
          reject(promise);
      })
  }
  static all(promises) {
      const result = [];
      return new MyPromise((resolve, reject) => {
          promises.forEach(item => {
              item.then(res => {
                  result.push(res);
                  if (result.length == promises.length) {
                      resolve(result);
                  }
              }, error => {
                  reject(error);
              })
          })
      })
  }
  static race(promises) {
      return new MyPromise((resolve, reject) => {
          promises.forEach(item => {
              item.then(res => {
                  resolve(res);
              }, error => {
                  reject(error);
              })
          })
      })
  }
  static allSettled(promises) {
      const result = [];
      return new MyPromise((resolve, reject) => {
          promises.forEach(item => {
              item.then(res => {
                  result.push(item);
                  if (result.length === promises.length) {
                      resolve(result);
                  }
              }, error => {
                  result.push(item);
                  if (result.length === promises.length) {
                      resolve(result);
                  }
              })
          })
      })
  }
}

```


## 手写函数节流
::: tip
函数节流：将原本1秒可能执行10次的函数，节流成1秒只执行2次-3次，有许多函数需要节流，例如：<br/>
1. `window.onresize`事件
2. `mouseover`事件
3. `scroll`事件
4. 其他事件
:::
```js
function throttle(fn, interval) {
  let flag = true;
  return funtion(...args) {
    let context = this;
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(context, args);
      flag = true;
    }, interval);
  };
};

const throttle = function(fn, interval) {
  let last = 0; // 上一次执行该函数的时间
  return function (...args) {
    let context = this;
    let now = +new Date();
    // 将当前时间和上一次执行函数时间对比
    // 如果差值大于设置的等待时间就执行函数
    if(now - last < interval) return;
    last = now;
    fn.apply(this, args)
  }
}
// 运用
window.onresize = throttle(function() {
  console.log('window onresize');
}, 500)
```

## 手写函数防抖
::: tip
核心：
函数防抖的核心思路是利用`setTimeout`延迟执行某个方法，只有在指定的事件后才执行，中间触发的事件不执行。
每次事件触发则删除原来的`setTimeout`，建立新的`setTimeout`。跟王者荣耀的回城功能类似，你反复触发回城功能，那么只认最后一次，从最后一次触发开始计时。
:::
```js
// func是用户传入需要防抖的函数
// wait是等待时间
function debounce(fn, delay) {
  let timer = null; // 缓存一个定时器id
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function (...args) {
    let context = this;
    if(timer) clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  }
}
window.onresize = debounce(function() {
  console.log('window onresize end');
}, 500)
```

## 加强版防抖节流
::: tip
现在我们可以把`防抖`和`节流`放到一起，为什么呢？因为防抖有时候触发的太频繁会导致一次响应都没有，我们希望到了固定的时间必须给用户一个响应，事实上很多前端库就是采取了这样的思路。
:::
```js
function throttle(fn, delay) {
  let last = 0, timer = null;
  return function (...args) {
    let context = this;
    let now = new Date();
    if(now - last > delay){
      clearTimeout(timer);
      setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, delay);
    } else {
      // 这个时候表示时间到了，必须给响应
      last = now;
      fn.apply(context, args);
    }
  }
}
window.onresize = throttle(function() {
  console.log('window onresize end');
}, 500)
```

## 手写简易深拷贝
::: tip
案例只实现了简易的深拷贝函数，工作中推荐使用`lodash`的深拷贝方法。
:::
```js
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null;
  }
  if(!isObject(obj)) {
    throw new Error('非对象');
  }
  var isArray = Array.isArray(obj);
  var newObj = isArray ? [...obj] : {...obj};
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(newObj[key]) ? deepClone(newObj[key]) : newObj[key];
  })
  return newObj;
}
var obj = {
  name: 'AAA',
  age: 23,
  job: {
    name: 'FE',
    money: 12000
  }
}
var cloneObj = deepClone(obj);
obj.job.money = 13000;
console.log(obj.job.money);     // 输出13000
console.log(cloneObj.job.money);// 输出12000
```

## 手写对象属性值迭代器
::: tip
自定义对象属性值迭代器，使之能使用`for of`循环遍历对象属性的值
:::
```js
var obj = {
  name: 'AAA',
  age: 23,
  address: '广州'
}
Object.defineProperty(obj, Symbol.iterator, {
  writable: false,
  enumerable: false,
  configurable: true,
  value: function() {
    var self = this;
    var index = 0;
    var keys = Object.keys(self);
    return {
      next: function() {
        return {
          value: self[keys[index++]],
          done: index > keys.length
        }
      }
    }
  }
})
for (const val of obj) {
  console.log(`属性值为：${val}`);
}
```

## 手写事件委托
::: tip 题目
循环创建10个li标签，当点击li标签时，打印其对应的索引
:::
```html
<ul id="list"></ul>
```
```js
function loadNode(len) {
  var html = '';
  for (let index = 0; index < 10; index++) {
    html += '<li>'+index+'</li>';
  }
  var list = document.getElementById('list');
  list.onclick = function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if(target.nodeName.toLowerCase() === 'li') {
      console.log(target.innerText);
    }
  }
  list.innerHTML = html;
}
loadNode();
```

## 手写原生Ajax请求
::: tip 原生ajax步骤
1. 创建`XMLHttpRequest`对象
2. 使用`open`方法设置和服务器的交互信息
3. 使用`send`发送数据
4. 注册事件
:::

### get请求
```js
var xhr = new XMLHttpRequest();
xhr.open('get','https://www.baidu.com/getUserInfo?name=AAA&age=18');
xhr.send();
xhr.onreadystatechange = function() {
  if(xhr.readyState ==4 && xhr.status==200) {
    console.log('请求成功');
  }
}
```
### post请求
```js
var xhr = new XMLHttpRequest();
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhr.open('post','https://www.baidu.com/getUserInfo');
xhr.send('name=AAA&age=18');
xhr.onreadystatechange = function() {
  if(xhr.readyState ==4 && xhr.status==200) {
    console.log('请求成功');
  }
}
```

## 手写柯里化
**柯里化**：又称部分求值，一个柯里化参数首先会接受一些参数，接受这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来，待到合适的时机一起求值。<br>
```js
// 通用的柯里化
var currying = function(fn) {
  var args = [];
  return function() {
    if(arguments.length==0) {
      return fn.apply(this,args);
    } else {
      Array.prototype.push.apply(args,arguments);
      return arguments.callee;
    }
  }
}

var cost = (function(){
  var money = 0;
  return function() {
    for(var i = 0,len = arguments.length;i<len;i++) {
      money +=arguments[i];
    }
    return money;
  }
})()
var cost = currying(cost);
cost(100);
cost(200);
cost(20);
cost(10);    
console.log(cost()); // 输出330
```

## 手写 Object.create 

思路：将传入的对象作为原型

```js
function create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
```


## 手写 instanceof 方法
::: tip
`instanceof`运算符用于判断构造函数的`prototype`,属性是否出现在对象的原型链中的任何位置。
:::
实现步骤：
1. 首先获取类型的原型
2. 然后获得对象的原型
3. 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 `null`，因为原型链最终为 `null`

```js
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left), // 获取对象的原型
      prototype = right.prototype; // 获取构造函数的 prototype 对象

  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;

    proto = Object.getPrototypeOf(proto);
  }
}
```

## 手写 new 操作符

在调用 `new` 的过程中会发生以上四件事情：

（1）首先创建了一个新的空对象

（2）设置原型，将对象的原型设置为函数的 prototype 对象。

（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）

（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```js
function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  // 判断参数是否是一个函数
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);
  // 判断返回对象
  let flag = result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObject;
}
// 使用方法
objectFactory(构造函数, 初始化参数);
```

