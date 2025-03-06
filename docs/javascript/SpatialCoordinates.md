---
sidebar: auto
---


## 基础知识

首先参考画布分为视口（窗口）与文档的含义

- 网页很多都是多屏，所以文档尺寸一般大于视口尺寸
- 视口尺寸不包括浏览器工具条、菜单、标签、状态栏等
- 当打开控制台后，视口尺寸相应变小
- 文档像position定位，视口类似fixed定位
- 文档坐标在页面滚动时不发生改变
- 视口坐标的操作需要考虑滚动条的位置
![image-20200429090819856](https://gitee.com/husky-bear/picture-bed/raw/master/javascript/image-20200429090819856.cfb9c52c.png)
## 视口文档

视口坐标需要知道滚动条位置才可以进行计算，有以下几种方式获取滚动位置

| 方法                                  | 说明     | 注意                 |
| ------------------------------------- | -------- | -------------------- |
| window.innerWidth                     | 视口宽度 | 包括滚动条（不常用） |
| window.innerHeight                    | 视口高度 | 包括滚动条（不常用） |
| document.documentElement.clientWidth  | 视口宽度 |                      |
| document.documentElement.clientHeight | 视口高度 |                      |

## 几何形状

元素在页面中拥有多个描述几何数值的尺寸，下面截图进行了形象的描述。

![image-20200430150343684](https://gitee.com/husky-bear/picture-bed/raw/master/javascript/image-20200430150343684.f8861e2f.png)

| 方法                          | 说明                                                         | 备注                           |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------ |
| element.getBoundingClientRect | 返回元素在视口坐标及元素大小，不包括外边距，width/height与offsetWidth/offsetHeight匹配 | 窗口坐标                       |
| element.getClientRects        | 行级元素每行尺寸位置组成的数组                               |                                |
| element.offsetParent          | 拥有定位属性的父级，或body/td/th/table                       | 对于隐藏元素/body/html值为null |
| element.offsetWidth           | 元素宽度尺寸，包括内边距与边框和滚动条                       |                                |
| element.offsetHeight          | 元素高度尺寸，包括内边距与边框和滚动条                       |                                |
| element.offsetLeft            | 相对于祖先元素的X轴坐标                                      |                                |
| element.offsetTop             | 相对于祖先元素的Y轴坐标                                      |                                |
| element.clientWidth           | 元素宽度，不包含边框，只包含内容和内边距，行元素尺寸为0      |                                |
| element.clientHeight          | 元素高度，不包含边框，只包含内容和内边距，行元素尺寸为0      |                                |
| element.clientLeft            | 内容距离外部的距离，滚动条在左侧时包括滚动条尺寸             |                                |
| element.clientTop             | 内容距离顶部的距离，滚动条在顶部时包括滚动条尺寸             |                                |
| element.scrollWidth           | 元素宽度，内容+内边距+内容溢出的尺寸                         |                                |
| element.scrollHeight          | 元素高度，内容+内边距+内容溢出的尺寸                         |                                |
| element.scrollLeft            | 水平滚动条左侧已经滚动的宽度                                 |                                |
| element.scrollTop             | 垂直滚动条顶部已经滚动的高度                                 |                                |

**为什么不要使用getComputedStyle**

- 尺寸设置auto时获取结果不可用
- 由于滚动条的存在，不同浏览器返回结果不同
- 元素没有设置尺寸获取不到

**getBoundingClientRect**

使用getBoundingClientRect获取元素矩形信息

```text
<style>
  #app {
    width: 200px;
    height: 200px;
    padding: 20px;
    margin: 20px;
    border: solid 10px #ddd;
    overflow: auto;
  }
</style>
<div id="app"></div>
<script>
  let app = document.querySelector('#app')
  let pos = app.getBoundingClientRect()
  console.log(pos) //
</script>
```

计算结果的矩形尺寸不包括外边距

```text
bottom: 280
height: 260
left: 28
right: 288
top: 20
width: 260
x: 28
y: 20
```

**getClientRects**

多行元素分别返回每行所占的尺寸，下面的行元素将为每行返回矩形尺寸

```text
<style>
	span {
    width: 200px;
    overflow: auto;
  }
</style>

<span
  >网页很多都是多屏，所以文档尺寸一般大于视口尺寸,当打开控制台后，视口尺寸相应变小。网页很多都是多屏，所以文档尺寸一般大于视口尺寸,当打开控制台后，视口尺寸相应变小。网页很多都是多屏，所以文档尺寸一般大于视口尺寸,当打开控制台后，视口尺寸相应变小。</span
>
<script>
  let span = document.querySelector('span')
  let info = span.getClientRects()
  console.log(info)
</script>
```

## 坐标判断

JS提供了方法获取指定坐标上的元素，如果指定坐标点在视口外，返回值为NULL

- 坐标都是从左上角计算，这与CSS中的right/bottom等不同
- 窗口坐标类似于position:fixed
- 文档坐标类似于position:absolute

| 方法                      | 说明                         |
| ------------------------- | ---------------------------- |
| element.elementsFromPoint | 返回指定坐标点所在的元素集合 |
| element.elementFromPoint  | 返回指定坐标点最顶级的元素   |

**元素集合**

返回指定坐标点上的元素集合

```text
<style>
  div {
    width: 200px;
    height: 200px;
  }
</style>
<div></div>
<script>
  const info = document.elementsFromPoint(100, 100)
  console.log(info)
</script>
```

返回结果为

```text
0: div
1: body
2: html
```

**顶级元素**

返回坐标点上的顶级元素

```text
<style>
  div {
    width: 200px;
    height: 200px;
  }
</style>
<div></div>
<script>
  const info = document.elementFromPoint(100, 100)
  console.log(info)
</script>
```

返回结果为

```text
div
```

## 滚动控制

| 方法                                   | 说明                           | 参数说明                                                     |
| -------------------------------------- | ------------------------------ | ------------------------------------------------------------ |
| window.pageXOffset                     | 文档相对窗口水平滚动的像素距离 |                                                              |
| window.pageYOffset                     | 文档相对窗口垂直滚动的像素距离 |                                                              |
| element.scrollLeft()                   | 元素X轴滚动位置                |                                                              |
| element.scrollTop()                    | 元素Y轴滚动位置                |                                                              |
| element.scrollBy()                     | 按偏移量进行滚动内容           | 参数为对象，{top:垂直偏移量,left:水平偏移量,behavior:'滚动方式'} |
| element.scroll() 或 element.scrollTo() | 滚动到指定的具体位置           | 参数为对象，{top:X轴文档位置,left:Y轴文档位置,behavior:'滚动方式'} |
| element.scrollLeft                     | 获取和设置元素X轴滚动位置      | 这是属性，设置X轴文档位置                                    |
| element.scrollTop                      | 获取和设置元素Y轴滚动位置      | 这是属性，设置Y轴文档位置                                    |
| element.scrollIntoView(bool)           | 定位到顶部或底部               | 参数为true元素定位到顶部，为false定位到窗口底部              |

使用scrollBy滚动文档

```text
<style>
  body {
    height: 3000px;
  }
</style>

<script type="module">
  setInterval(() => {
    document.documentElement.scrollBy({ top: 30, behavior: 'smooth' })
  }, 100)
</script>
```

使用scroll滚动到指定位置

```text
<style>
  body {
    height: 3000px;
  }
</style>

<script type="module">
  setTimeout(() => {
    document.documentElement.scroll({ top: 30, behavior: 'smooth' })
  }, 1000)
</script>
```

使用元素scrollIntoView方法实现滚动操作，参数可以是布尔值或对象

- 参数为 true 时顶部对齐，相当于{block: "start"}
- 参数为 false 时底部对齐，相当于{block: "end"}
- 定义 {behavior:smooth} 为平滑滚动

```javascript
<style>
  div {
    height: 2000px;
    background: red;
  }
  span {
    border-radius: 50%;
    color: #fff;
    background: #000;
    width: 50px;
    height: 50px;
    display: block;
    text-align: center;
    line-height: 50px;
    position: fixed;
    top: 50%;
    right: 50px;
    border: solid 2px #ddd;
  }
</style>
<div>hdcms.com</div>
<h1>11111.com</h1>
<span>TOP</span>

<script>
  document.querySelector('span').addEventListener('click', () => {
    let h1 = document.querySelector('h1')
    h1.scrollIntoView({
      behavior: 'smooth',
    })
  })
</script>
```