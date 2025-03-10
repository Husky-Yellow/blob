---
sidebar: auto
---

### 原型对象

每个对象都有一个原型`prototype`对象，通过函数创建的对象也将拥有这个原型对象。原型是一个指向对象的指针。

*   可以将原型理解为对象的父亲，对象从原型对象继承来属性
*   原型就是对象除了是某个对象的父母外没有什么特别之处
*   所有函数的原型默认是 `Object`的实例，所以可以使用`toString/toValues/isPrototypeOf` 等方法的原因
*   使用原型对象为多个对象共享属性或方法
*   如果对象本身不存在属性或方法将到原型上查找
*   使用原型可以解决，通过构建函数创建对象时复制多个函数造成的内存占用问题
*   原型包含 `constructor` 属性，指向构造函数
*   对象包含 `__proto__` 指向他的原型对象

下例使用的就是数组原型对象的 `concat` 方法完成的连接操作
```js
let hd = ["a"];
console.log(hd.concat("b"));
console.log(hd); 
```
默认情况下创建的对象都有原型

![image-20191205163626698](https://houdunren.gitee.io/note/assets/img/image-20191205163626698.7576e2ba.png)

 ```js
let hd = { name: "后盾人" };
console.log(hd);
```

以下x、y的原型都为元对象Object，即JS中的根对象

 ```js
 let x = {};
let y = {};
console.log(Object.getPrototypeOf(x) == Object.getPrototypeOf(y)); //true
```

我们也可以创建一个极简对象（纯数据字典对象）没有原型（原型为null)

![image-20191205163809670](https://houdunren.gitee.io/note/assets/img/image-20191205163809670.f473ca14.png)

 ```js
 let hd = { name: 3 };
console.log(hd.hasOwnProperty("name"));

let xj = Object.create(null, {
  name: {
    value: "向军"
  }
});
console.log(xj.hasOwnProperty("name")); //Error

//Object.keys是静态方法，不是原型方法所以是可以使用的
console.log(Object.keys(xj));
```

函数拥有多个原型，`prototype` 用于实例对象使用，`__proto__`用于函数对象使用

 ```js
 function User() {}
User.__proto__.view = function() {
  console.log("User function view method");
};
User.view();

User.prototype.show = function() {
  console.log("后盾人");
};
let hd = new User();
hd.show();
console.log(User.prototype == hd.__proto__);
```

下面是原型关系分析，与方法继承的示例

![image-20191208003927158](https://houdunren.gitee.io/note/assets/img/image-20191208003927158.2f7f84ab.png)

 ```js
 let hd = new Object();
hd.name = "后盾人";
Object.prototype.show = function() {
  console.log("hodunren.com");
};
hd.show();

function User() {}
let xj = new User();
xj.show();
User.show();
```

下面是使用构造函数创建对象的原型体现

*   构造函数拥有原型
*   创建对象时构造函数把原型赋予对象

![image-20191010023843179](https://houdunren.gitee.io/note/assets/img/image-20191010023843179.58edd59f.png)

 ```js
 function User() {}
let xj = new User();
console.log(xj.__proto__ == User.prototype);
```

下面使用数组会产生多级继承即原型链

![image-20191120174145258](https://houdunren.gitee.io/note/assets/img/image-20191120174145258.aec2cd6d.png)

 ```js
 let hd = [];
console.log(hd);
console.log(hd.__proto__ == Array.prototype);

let str = "";
console.log(str.__proto__ == String.prototype);
```

下面使用 `setPrototypeOf` 与 `getPrototypeOf` 获取与设置原型

 ```js
 let hd = {};
let parent = { name: "parent" };
Object.setPrototypeOf(hd, parent);
console.log(hd);
console.log(Object.getPrototypeOf(hd));
```

使用自定义构造函数创建的对象的原型体现

![image-20191120174956195](https://houdunren.gitee.io/note/assets/img/image-20191120174956195.700031e6.png)

 ```js
 function User() {}
let hd = new User();
console.log(hd);
```

constructor存在于prototype原型中，用于指向构建函数的引用。

 ```js
 function hd() {
  this.show = function() {
    return "show method";
  };
}
const obj = new hd(); //true
console.log(obj instanceof hd);

const obj2 = new obj.constructor();
console.dir(obj2.show()); //show method
```

使用对象的 `constructor` 创建对象

 ```js
 function User(name, age) {
  this.name = name;
  this.age = age;
}

function createByObject(obj, ...args) {
  const constructor = Object.getPrototypeOf(obj).constructor;
  return new constructor(...args);
}

let hd = new User("后盾人");
let xj = createByObject(hd, "向军", 12);
console.log(xj);
```

### 原型链

通过引用类型的原型，继承另一个引用类型的属性与方法，这就是实现继承的步骤。

![image-20191010012103033](https://houdunren.gitee.io/note/assets/img/image-20191010012103033.3540a960.png)

使用`Object.setPrototypeOf` 可设置对象的原型，下面的示例中继承关系为 obj>hd>cms。

`Object.getPrototypeOf` 用于获取一个对象的原型。

 ```js
 let obj = {
  name: "后盾人"
};
let hd = {
  web: "houdunren"
};
let cms = {
  soft: "hdcms"
};
//让obj继承hd，即设置obj的原型为hd
Object.setPrototypeOf(obj, hd);
Object.setPrototypeOf(hd, cms);
console.log(obj.web);
console.log(Object.getPrototypeOf(hd) == cms); //true
```

### 原型检测

instanceof 检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上

 ```js
 function A() {}
function B() {}
function C() {}

const c = new C();
B.prototype = c;
const b = new B();
A.prototype = b;
const a = new A();

console.dir(a instanceof A); //true
console.dir(a instanceof B); //true
console.dir(a instanceof C); //true
console.dir(b instanceof C); //true
console.dir(c instanceof B); //false
```

使用`isPrototypeOf`检测一个对象是否是另一个对象的原型链中

 ```js
 const a = {};
const b = {};
const c = {};

Object.setPrototypeOf(a, b);
Object.setPrototypeOf(b, c);

console.log(b.isPrototypeOf(a)); //true
console.log(c.isPrototypeOf(a)); //true
console.log(c.isPrototypeOf(b)); //true
```

### 属性遍历

使用`in` 检测原型链上是否存在属性，使用 `hasOwnProperty` 只检测当前对象

 ```js
 let a = { url: "houdunren" };
let b = { name: "后盾人" };
Object.setPrototypeOf(a, b);
console.log("name" in a);
console.log(a.hasOwnProperty("name"));
console.log(a.hasOwnProperty("url"));
```

使用 `for/in` 遍历时同时会遍历原型上的属性如下例

 ```js
 let hd = { name: "后盾人" };
let xj = Object.create(hd, {
  url: {
    value: "houdunren.com",
    enumerable: true
  }
});
for (const key in xj) {
  console.log(key);
}
```

`hasOwnProperty` 方法判断对象是否存在属性，而不会查找原型。所以如果只想遍历对象属性使用以下代码

 ```js
 let hd = { name: "后盾人" };
let xj = Object.create(hd, {
  url: {
    value: "houdunren.com",
    enumerable: true
  }
});
for (const key in xj) {
  if (xj.hasOwnProperty(key)) {
    console.log(key);
  }
}
```

### 借用原型

使用 `call` 或 `apply` 可以借用其他原型方法完成功能。

下面的xj对象不能使用`max`方法，但可以借用 hd 对象的原型方法

 ```js
 let hd = {
  data: [1, 2, 3, 4, 5]
};
Object.setPrototypeOf(hd, {
  max: function() {
    return this.data.sort((a, b) => b - a)[0];
  }
});
console.log(hd.max());

let xj = {
  lessons: { js: 100, php: 78, node: 78, linux: 125 },
  get data() {
    return Object.values(this.lessons);
  }
};
console.log(hd.__proto__.max.apply(xj));
```

上例中如果方法可以传参，那就可以不在 `xj` 对象中定义 `getter` 方法了

 ```js
 let hd = {
  data: [1, 2, 3, 4, 5]
};
Object.setPrototypeOf(hd, {
  max: function(data) {
    return data.sort((a, b) => b - a)[0];
  }
});
console.log(hd.max(hd.data));

let xj = {
  lessons: { js: 100, php: 78, node: 78, linux: 125 }
};
console.log(hd.__proto__.max.call(xj, Object.values(xj.lessons)));
```

因为 `Math.max` 就是获取最大值的方法，所以代码可以再次优化

 ```js
 let hd = {
  data: [1, 2, 3, 4, 5]
};
console.log(Math.max.apply(null, Object.values(hd.data)));

let xj = {
  lessons: { js: 100, php: 78, node: 78, linux: 125 }
};
console.log(Math.max.apply(xj, Object.values(xj.lessons)));
```

下面是获取设置了 `class` 属性的按钮，但DOM节点不能直接使用数组的`filter` 等方法，但借用数组的原型方法就可以操作了。

 ```js
 <body>
  <button message="后盾人" class="red">后盾人</button>
  <button message="hdcms">hdcms</button>
</body>
<script>
  let btns = document.querySelectorAll("button");
  btns = Array.prototype.filter.call(btns, item => {
    return item.hasAttribute("class");
  });
</script>
```

### this

`this` 不受原型继承影响，`this` 指向调用属性时使用的对象。

 ```js
 let hd = {
  name: "后盾人"
};
let houdunren = {
  name: "向军",
  show() {
    return this.name;
  }
};
hd.__proto__ = houdunren;
console.log(hd.show()); //后盾人
```

## 原型总结

### prototype

函数也是对象也有原型，函数有 `prototype` 属性指向他的原型

为构造函数设置的原型指，当使用构造函数创建对象时把这个原型赋予给这个对象

 ```js
 function User(name) {
  this.name = name;
}
User.prototype = {
  show() {
    return this.name;
  }
};
let xj = new User("向军");
console.log(xj.show());
```

函数默认`prototype` 指包含一个属性 `constructor` 的对象，`constructor` 指向当前构造函数

 ```js
 function User(name) {
  this.name = name;
}
let xj = new User("向军");
console.log(xj);
console.log(User.prototype.constructor == User); //true
console.log(xj.__proto__ == User.prototype); //true

let lisi = new xj.constructor("李四");
console.log(lisi.__proto__ == xj.__proto__); //true
```

原型中保存引用类型会造成对象共享属性，所以一般只会在原型中定义方法。

 ```js
 function User() {}
User.prototype = {
  lessons: ["JS", "VUE"]
};
const lisi = new User();
const wangwu = new User();

lisi.lessons.push("CSS");

console.log(lisi.lessons); //["JS", "VUE", "CSS"]
console.log(wangwu.lessons); //["JS", "VUE", "CSS"]
```

为Object原型对象添加方法，将影响所有函数

 ```js
 <body>
  <button onclick="this.hide()">后盾人</button>
</body>
<script>
  Object.prototype.hide = function() {
    this.style.display = "none";
  };
</script>
```

了解了原型后可以为系统对象添加方法，比如为字符串添加了一截断函数。

*   不能将系统对象的原型直接赋值

 ```js
 String.prototype.truncate = function (len = 5) {
	return this.length <= len ? this : this.substr(0, len) + '...';
}
console.log('后盾人每天不断视频教程'.truncate(3)); //后盾人...
```

### Object.create

使用`Object.create`创建一个新对象时使用现有对象做为新对象的原型对象

![image-20191205153548377](https://houdunren.gitee.io/note/assets/img/image-20191205153548377.2d54d9db.png)

使用`Object.create` 设置对象原型

 ```js
 let user = {
  show() {
    return this.name;
  }
};

let hd = Object.create(user);
hd.name = "向军";
console.log(hd.show());
```

强以在设置时使用第二个参数设置新对象的属性

 ```js
 let user = {
  show() {
    return this.name;
  }
};
let hd = Object.create(user, {
  name: {
    value: "后盾人"
  }
});
console.log(hd);
```

### __proto__

在实例化对象上存在 __proto__ 记录了原型，所以可以通过对象访问到原型的属性或方法。

*   `__proto__` 不是对象属性，理解为`prototype` 的 `getter/setter` 实现，他是一个非标准定义
*   `__proto__` 内部使用`getter/setter` 控制值，所以只允许对象或null
*   建议使用 `Object.setPrototypeOf` 与`Object.getProttoeypOf` 替代 `__proto__`

下面修改对象的 `__proto__` 是不会成功的，因为`_proto__` 内部使用`getter/setter` 控制值，所以只允许对象或null

 ```js
 let xj = {};
xj.__proto__ = "向军";
console.log(xj);
```

下面定义的`__proto__` 就会成功，因为这是一个极简对象，没有原型对象所以不会影响`__proto__`赋值。

 ```js
 let hd = Object.create(null);
hd.__proto__ = "向军";
console.log(hd); //{__proto__: "向军"}
```

下面通过改变对象的 `__proto__` 原型对象来实现继承，继承可以实现多层,

![image-20191205121620242](https://houdunren.gitee.io/note/assets/img/image-20191205121620242.d709e234.png)

 ```js
 let hd = {
  name: "后盾人"
};
let houdunren = {
  show() {
    return this.name;
  }
};
let xj = {
  handle() {
    return `用户: ${this.name}`;
  }
};
houdunren.__proto__ = xj;
hd.__proto__ = houdunren;
console.log(hd.show());
console.log(hd.handle());
console.log(hd);
```

构造函数中的 `__proto__` 使用

 ```js
 function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function () {
	return `姓名:${this.name}，年龄:${this.age}`;
};
let lisi = new User('李四', 12);
let xiaoming = new User('小明', 32);
console.log(lisi.__proto__ == User.prototype); //true
```

可以使用 `__proto__` 或 `Object.setPrototypeOf` 设置对象的原型，使用`Object.getProttoeypOf` 获取对象原型。

 ```js
 function Person() {
  this.getName = function() {
    return this.name;
  };
}
function User(name, age) {
  this.name = name;
  this.age = age;
}
let lisi = new User("李四", 12);
Object.setPrototypeOf(lisi, new Person());
console.log(lisi.getName()); //李四
```

对象设置属性，只是修改对象属性并不会修改原型属性，使用`hasOwnProperty` 判断对象本身是否含有属性并不会检测原型。

 ```js
 function User() {}
const lisi = new User();
const wangwu = new User();

lisi.name = "小明";
console.log(lisi.name);
console.log(lisi.hasOwnProperty("name"));

//修改原型属性后
lisi.__proto__.name = "张三";
console.log(wangwu.name);

//删除对象属性后
delete lisi.name;
console.log(lisi.hasOwnProperty("name"));
console.log(lisi.name);
```

使用 `in` 会检测原型与对象，而 `hasOwnProperty` 只检测对象，所以结合后可判断属性是否在原型中

 ```js
 function User() {
}
User.prototype.name = "后盾人";
const lisi = new User();
//in会在原型中检测
console.log("name" in lisi);
//hasOwnProperty 检测对象属性
console.log(lisi.hasOwnProperty("name"));
```

### 使用建议

通过前介绍我们知道可以使用多种方式设置原型，下面是按时间顺序的排列

1.  `prototype` 构造函数的原型属性
2.  `Object.create` 创建对象时指定原型
3.  `__proto__` 声明自定义的非标准属性设置原型，解决之前通过 `Object.create` 定义原型，而没提供获取方法
4.  `Object.setPrototypeOf` 设置对象原型

这几种方式都可以管理原型，一般以我个人情况来讲使用 `prototype` 更改构造函数原型，使用 `Object.setPrototypeOf` 与 `Object.getPrototypeOf` 获取或设置原型。

## 构造函数

### 原型属性

构造函数在被`new` 时把构造函数的原型（prototype）赋值给新对象。如果对象中存在属性将使用对象属性，不再原型上查找方法。

*   构造函数只会产生一个原型对象

 ```js
 function hd() {
  this.show = function() {
    return "show in object";
  };
}
hd.prototype.show = function() {
  return "show in prototype";
};
const obj = new hd();
console.log(obj.show());
```

对象的原型引用构造函数的原型对象，是在创建对象时确定的，当构造函数原型对象改变时会影响后面的实例对象。

 ```js
 function hd() {}
hd.prototype.name = "hdcms";
const obj1 = new hd();
console.log(obj1.name); //hdcms

hd.prototype = {
  name: "后盾人"
};
const obj2 = new hd();
console.dir(obj2.name); //后盾人
```

### constructor

构造函数的原型中包含属性 `constructor` 指向该构造函数，以下代码说明了这一点

 ```js
 function User(name) {
  this.name = name;
}
let hd = new User("后盾人");
let xj = new hd.constructor("向军");
console.log(xj);
```

以下代码直接设置了构造函数的原型将造成 `constructor` 丢失

 ```js
 function User(name) {
  this.name = name;
}
User.prototype = {
  show: function() {}
};

let hd = new User("后盾人");
let xj = new hd.constructor("向军");
console.log(xj); //String {"向军"}
```

正确的做法是要保证原型中的 `constructor`指向构造函数

 ```js
 function User(name) {
  this.name = name;
}
User.prototype = {
  constructor: User,
  show: function() {}
};

let hd = new User("后盾人");
let xj = new hd.constructor("向军");
console.log(xj);
```

### 使用优化

使用构造函数会产生函数复制造成内存占用，及函数不能共享的问题。

 ```js
 function User(name) {
  this.name = name;
  this.get = function() {
    return this.name;
  };
}
let lisi = new User("小明");
let wangwu = new User("王五");
console.log(lisi.get == wangwu.get); //false
```

体验通过原型定义方法不会产生函数复制

 ```js
 function User(name) {
  this.name = name;
}
User.prototype.get = function() {
  return "后盾人" + this.name;
};
let lisi = new User("小明");

let wangwu = new User("王五");
console.log(lisi.get == wangwu.get); //true
//通过修改原型方法会影响所有对象调用，因为方法是共用的
lisi.__proto__.get = function() {
  return "后盾人" + this.name;
};
console.log(lisi.get());
console.log(wangwu.get());
```

下面演示使用原型为多个实例共享属性

 ```js
 function User(name, age) {
  this.name = name;
  this.age = age;
  this.show = () => {
  	return `你在${this.site}的姓名:${this.name}，年龄:${this.age}`;
  }
}
User.prototype.site = '后盾人';
let lisi = new User('李四', 12); 
let xiaoming = new User('小明', 32);

console.log(lisi.show()); //你在后盾人的姓名:李四，年龄:12
console.log(xiaoming.show()); //你在后盾人的姓名:小明，年龄:32
```

将方法定义在原型上为对象共享，解决通过构造函数创建对象函数复制的内存占用问题

 ```js
 function User(name) {
    this.name = name;
}
User.prototype.get = function () {
    return '后盾人' + this.name;
}
let lisi = new User('小明');

let wangwu = new User('王五');
console.log(lisi.get == wangwu.get); //true
//通过修改原型方法会影响所有对象调用，因为方法是共用的
lisi.__proto__.get = function () {
    return '后盾人' + this.name;
}
console.log(lisi.get());
console.log(lisi.get());
console.log(wangwu.get());
```

使用`Object.assign`一次设置原型方法来复用，后面会使用这个功能实现Mixin模式

 ```js
 function User(name, age) {
  this.name = name;
  this.age = age;
}
Object.assign(User.prototype, {
  getName() {
      return this.name;
  },
  getAge() {
      return this.age;
  }
});
let lisi = new User('李四', 12);
let xiaoming = new User('小明', 32);
console.log(lisi.getName()); //李四
console.log(lisi.__proto__)
```

### 体验继承

下面为 `Stu` 更改了原型为`User` 的实例对象，`lisi`是通过构造函数`Stu`创建的实例对象

*   `lisi`在执行`getName` 方法时会从自身并向上查找原型，这就是原型链特性
*   当然如果把 `getName` 添加到对象上，就不继续追溯原型链了

 ```js
 "use strict";
function User() {}
User.prototype.getName = function() {
  return this.name;
};

function Stu(name) {
  this.name = name;
}
Stu.prototype = new User();
const lisi = new Stu("李四");

console.log(lisi.__proto__);
console.log(lisi.getName());
```

## 继承与多态

当对象中没使用的属性时，JS会从原型上获取这就是继承在JavaScript中的实现。

### 继承实现

下面使用`Object.create` 创建对象，做为`Admin、Member`的原型对象来实现继承。

![image-20191120214826701](https://houdunren.gitee.io/note/assets/img/image-20191120214826701.a67be927.png)

 ```js
 function User() {}
User.prototype.getUserName = function() {};

function Admin() {}
Admin.prototype = Object.create(User.prototype);
Admin.prototype.role = function() {};

function Member() {}
Member.prototype = Object.create(User.prototype);
Member.prototype.email = function() {};
console.log(new Admin());
console.log(new Member());
```

不能使用以下方式操作，因为这样会改变User的原型方法，这不是继承，这是改变原型

 ```js
 ...
function User() {}
User.prototype.getUserName = function() {};

function Admin() {}
Admin.prototype = User.prototype;
Admin.prototype.role = function() {};
...
```

### 构造函数

有多种方式通过构造函数创建对象

 ```js
 function Admin() {}
console.log(Admin == Admin.prototype.constructor); //true

let hd = new Admin.prototype.constructor();
console.log(hd);

let xj = new Admin();
console.log(xj);
```

因为有时根据得到的对象获取构造函数，然后再创建新对象所以需要保证构造函数存在，但如果直接设置了 `Admin.prototype` 属性会造成`constructor`丢失，所以需要再次设置`constructor`值。

 ```js
 function User() {}
function Admin() {}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.role = function() {};

let xj = new Admin();
console.log(xj.constructor); //constructor丢失，返回User构造函数

Admin.prototype.constructor = Admin;

let hd = new Admin();
console.log(hd.constructor); //正确返回Admin构造函数

//现在可以通过对象获取构造函数来创建新对象了
console.log(new hd.constructor());
```

使用`Object.defineProperty`定义来禁止遍历constructor属性

 ```js
 function User() {}
function Admin(name) {
  this.name = name;
}

Admin.prototype = Object.create(User.prototype);

Object.defineProperty(Admin.prototype, "constructor", {
  value: Admin,
  enumerable: false //禁止遍历
});

let hd = new Admin("后盾人");
for (const key in hd) {
  console.log(key);
}
```

完全重写构建函数原型，只对后面应用对象有效

 ```js
 function User() {}
const lisi = new User();
User.prototype = {
  show() {
    return "prototype show";
  }
};
const wangwu = new User();
console.log(wangwu.show());

console.log(lisi.show()); // lisi.show is not a function
```

### 方法重写

下而展示的是子类需要重写父类方法的技巧。

 ```js
 function Person() {}
Person.prototype.getName = function() {
  console.log("parent method");
};

function User(name) {}
User.prototype = Object.create(Person.prototype);
User.prototype.constructor = User;

User.prototype.getName = function() {
  //调用父级同名方法
  Person.prototype.getName.call(this);
  console.log("child method");
};
let hd = new User();
hd.getName();
```

### 多态

根据多种不同的形态产生不同的结果，下而会根据不同形态的对象得到了不同的结果。

 ```js
 function User() {}
User.prototype.show = function() {
  console.log(this.description());
};

function Admin() {}
Admin.prototype = Object.create(User.prototype);
Admin.prototype.description = function() {
  return "管理员在此";
};

function Member() {}
Member.prototype = Object.create(User.prototype);
Member.prototype.description = function() {
  return "我是会员";
};

function Enterprise() {}
Enterprise.prototype = Object.create(User.prototype);
Enterprise.prototype.description = function() {
  return "企业帐户";
};

for (const obj of [new Admin(), new Member(), new Enterprise()]) {
  obj.show();
}
```

## 深挖继承

继承是为了复用代码，继承的本质是将原型指向到另一个对象。

### 构造函数

我们希望调用父类构造函数完成对象的属性初始化，但像下面这样使用是不会成功的。因为此时 `this` 指向了window，无法为当前对象声明属性。

 ```js
 function User(name) {
  this.name = name;
  console.log(this);// Window
}
User.prototype.getUserName = function() {
  return this.name;
};

function Admin(name) {
  User(name);
}
Admin.prototype = Object.create(User.prototype);
Admin.prototype.role = function() {};

let xj = new Admin("向军大叔");
console.log(xj.getUserName()); //undefined
```

解决上面的问题是使用 `call/apply` 为每个生成的对象设置属性

 ```js
 function User(name) {
  this.name = name;
  console.log(this); // Admin
}
User.prototype.getUserName = function() {
  return this.name;
};

function Admin(name) {
  User.call(this, name);
}
Admin.prototype = Object.create(User.prototype);

let xj = new Admin("向军大叔");
console.log(xj.getUserName()); //向军大叔
```

### 原型工厂

原型工厂是将继承的过程封装，使用继承业务简单化。

 ```js
 function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  sub.prototype.constructor = sub;
}

function Access() {}
function User() {}
function Admin() {}
function Member() {}

extend(User, Access); //User继承Access
extend(Admin, User); //Admin继承User
extend(Member, Access); //Member继承Access

Access.prototype.rules = function() {};
User.prototype.getName = function() {};

console.log(new Admin()); // 继承关系: Admin>User>Access>Object
console.log(new Member()); //继承关系：Member>Access>Object
```

### 对象工厂

在原型继承基础上，将对象的生成使用函数完成，并在函数内部为对象添加属性或方法。

 ```js
 function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function() {
  console.log(this.name, this.age);
};

function Admin(name, age) {
  let instance = Object.create(User.prototype);
  User.call(instance, name, age);
  instance.role=function(){
    console.log('admin.role');
  }
  return instance;
}
let hd = Admin("后盾人", 19);
hd.show();

function member(name, age) {
  let instance = Object.create(User.prototype);
  User.call(instance, name, age);
  return instance;
}
let lisi = member("李四", 28);
lisi.show();
```

### Mixin模式

`JS`不能实现多继承，如果要使用多个类的方法时可以使用`mixin`混合模式来完成。

*   `mixin` 类是一个包含许多供其它类使用的方法的类
*   `mixin` 类不用来继承做为其它类的父类

> 其他语言也有类似的操作比如`php` 语言中可以使用 `trait` 完成类似操作。

下面是示例中 `Admin`需要使用 `Request.prototype` 与 `Credit` 的功能，因为`JS` 是单继承，我们不得不将无关的类连接在一下，显然下面的代码实现并不佳

 ```js
 function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  sub.prototype.constructor = sub;
}
function Credit() {}
function Request() {}
function User(name, age) {
  this.name = name;
  this.age = age;
}
extend(Request, Credit);
extend(User, Request);
Credit.prototype.total = function() {
  console.log("统计积分");
};
Request.prototype.ajax = function() {
  console.log("请求后台");
};
User.prototype.show = function() {
  console.log(this.name, this.age);
};
function Admin(...args) {
  User.apply(this, args);
}
extend(Admin, User);
let hd = new Admin("向军", 19);
hd.show();
hd.total(); //统计积分
hd.ajax(); //请求后台
```

下面分拆功能使用Mixin实现多继承，使用代码结构更清晰。只让 `Admin` 继承 `User` 原型

 ```js
 function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  sub.prototype.constructor = sub;
}
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function() {
  console.log(this.name, this.age);
};
const Credit = {
  total() {
    console.log("统计积分");
  }
};
const Request = {
  ajax() {
    console.log("请求后台");
  }
};

function Admin(...args) {
  User.apply(this, args);
}
extend(Admin, User);
Object.assign(Admin.prototype, Request, Credit);
let hd = new Admin("向军", 19);
hd.show();
hd.total(); //统计积分
hd.ajax(); //请求后台
```

`mixin` 类也可以继承其他类，比如下面的 `Create` 类获取积分要请求后台，就需要继承 `Request` 来完成。

*   `super` 是在 `mixin` 类的原型中查找，而不是在 `User` 原型中

 ```js
 function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  sub.prototype.constructor = sub;
}
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function() {
  console.log(this.name, this.age);
};
const Request = {
  ajax() {
    return "请求后台";
  }
};
const Credit = {
  __proto__: Request,
  total() {
    console.log(super.ajax() + ",统计积分");
  }
};

function Admin(...args) {
  User.apply(this, args);
}
extend(Admin, User);
Object.assign(Admin.prototype, Request, Credit);
let hd = new Admin("向军", 19);
hd.show();
hd.total(); //统计积分
hd.ajax(); //请求后台
```

### 实例操作

使用 `call/apply` 制作选项卡

![Untitled](https://houdunren.gitee.io/note/assets/img/Untitled.71754c70.gif)

 ```js
 <style>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  main {
    width: 400px;
    flex-direction: column;
    position: relative;
    margin-right: 20px;
  }

  main nav {
    display: flex;
    height: 50px;
    align-items: center;
  }

  main nav a {
    background: #95a5a6;
    margin-right: px;
    padding: 10px 20px;
    border: solid 1px #333;
    color: #fff;
    text-decoration: none;
  }

  main nav a:first-of-type {
    background: #e67e22;
  }

  section {
    height: 200px;
    width: 100%;
    background: #f1c40f;
    position: absolute;
    font-size: 5em;
    display: none;
  }

  .hd-tab section:first-of-type {
    display: block;
  }

  section:nth-child(even) {
    background: #27ae60;
  }
</style>

<body>
  <main class="tab1">
    <nav>
      <a href="javascript:;">后盾人</a>
      <a href="javascript:;">hdcms</a>
    </nav>
    <section>1</section>
    <section>2</section>
  </main>
  <main class="tab2">
    <nav>
      <a href="javascript:;">后盾人</a>
      <a href="javascript:;">hdcms</a>
    </nav>
    <section>1</section>
    <section>2</section>
  </main>
</body>

<script>
	//继承工厂
  function extend(sub, sup) {
    sub.prototype = Object.create(sup.prototype);
    sub.prototype.constructor = sub;
  }

  //动作类
  function Animation() {}
  Animation.prototype.show = function() {
    this.style.display = "block";
  };
  //隐藏所有元素
  Animation.prototype.hide = function() {
    this.style.display = "none";
  };
  //必变元素集合背景
  Animation.prototype.background = function(color) {
    this.style.background = color;
  };

	//选项卡类
  function Tab(tab) {
    this.tab = tab;
    this.links = null;
    this.sections = null;
  }
  extend(Tab, Animation);
  Tab.prototype.run = function() {
    this.links = this.tab.querySelectorAll("a");
    this.sections = this.tab.querySelectorAll("section");
    this.bindEvent();
    this.action(0);
  };
  //绑定事件
  Tab.prototype.bindEvent = function() {
    this.links.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.reset();
        this.action(i);
      });
    });
  };
  //点击后触发动作
  Tab.prototype.action = function(i) {
    this.background.call(this.links[i], "#e67e22");
    this.show.call(this.sections[i]);
  };
  //重置link与section
  Tab.prototype.reset = function() {
    this.links.forEach((el, i) => {
      this.background.call(el, "#95a5a6");
      this.hide.call(this.sections[i]);
    });
  };

  new Tab(document.querySelector(".tab1")).run();
  new Tab(document.querySelector(".tab2")).run();
</script></code>