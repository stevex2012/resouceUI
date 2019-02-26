# CSS/SCSS编码规范

推荐通过 SASS、LESS 等预处理器语言来编写 CSS，利用其语言特性书写起来要简单很多。且能保证CSS代码的结构化和可维护性。

## 代码组织

以组件为单位组织代码段。
制定一致的注释规范。
使用一致的空白符将代码分隔成块，这样利于扫描较大的文档。
如果使用了多个 CSS 文件，将其按照组件而非页面的形式分拆，因为页面会被重组，而组件只会被移动。

模块内部的样式,建议在一百条内。

目录层次上,相同文件夹的import不换行,不同文件夹的导入要换行(建议参考bootstrap的sass写法)。可以把[bootstrap-sass目录结构](https://github.com/twbs/bootstrap-sass/tree/master/assets/stylesheets) `clone`下来，研究一番。

![clipboard.png](https://segmentfault.com/img/bVbictd?w=673&h=297)



## 命名规范

+ 通俗易懂，尽量保持不重复（冲突），尽量不要用id。

+ `class` 名称中只能出现小写字符和破折号（dashe）（不是下划线，也不是驼峰命名法）。破折号应当用于相关 class 的命名（类似于命名空间）（例如，.btn 和 .btn-danger）。

  ```
  .demo-test,
  #test-demo {
      width: 100%;
  }
  ```

+ 避免过度任意的简写。.btn 代表 button，但是 .s 不能表达任何意思。

+ `class` 名称应当尽可能短，并且意义明确。

+ 使用有意义的名称。使用有组织的或目的明确的名称，不要使用表现形式（presentational）的名称。

+ 基于最近的父 `class` 或基本（base） class 作为新 class 的前缀。

+ 使用 `.js-*` class 来标识行为（与样式相对），并且不要将这些 class 包含到 CSS 文件中。

+ 在为 SASS 和 LESS 变量命名是也可以参考上面列出的各项规范。

```
    /* Bad example */
    .t { ... }
    .red { ... }
    .header { ... }
    
    /* Good example */
    .tweet { ... }
    .important { ... }
    .tweet-header { ... }
```



### BEM

经常在css代码中看到“--”和“__”是什么意思？它们的出现是源于[BEM](http://bem.info/)和[Nicolas Gallagher](http://twitter.com/necolas)...

BEM的意思就是块（block）、元素（element）、修饰符（modifier）,是由[Yandex](http://yandex.ru/)团队提出的一种前端命名方法论。这种巧妙的命名方法让CSS类对其他开发者来说更加透明而且更有意义。

BEM命名约定更加严格，而且包含更多的信息，它们用于一个团队开发一个耗时的大项目。目前流行的基于BEM的命名方式是经过[Nicolas Gallagher修改过的](http://nicolasgallagher.com/about-html-semantics-front-end-architecture)。

命名约定的模式如下：

```
    .block{}
    .block__element{}
    .block--modifier{}    
```

`.block` 代表了更高级别的抽象或组件。
`.block__element` 代表.block的后代，用于形成一个完整的.block的整体。
`.block--modifier`代表.block的不同状态或不同版本。

之所以使用两个连字符和下划线而不是一个，是为了让你自己的块可以用单个连字符来界定，如：

```
.site-search{} /* 块 */  
.site-search__field{} /* 元素 */  
.site-search--full{} /* 修饰符 */    
```

[参考原文](https://www.w3cplus.com/css/mindbemding-getting-your-head-round-bem-syntax.html)

BEM的关键是，可以获得更多的描述和更加清晰的结构，从其名字可以知道某个标记的含义。于是，通过查看 HTML 代码中的 class 属性，就能知道元素之间的关联。

[BEM命名规范](https://juejin.im/post/5b925e616fb9a05cdd2ce70d)



### CSS-Modules

通过对当前引入的css class的命名增加hash来避免命名冲突。



### CSS-In-JS

CSS-in-JS 是一种使用 JavaScript来设置组件样式的技术。在解析此 JavaScript时，会生成 CSS（通常作为 `<style>` 元素）并附加到 DOM 中。这个功能由第三方库实现。例如，下面是使用 [Aphrodite](https://github.com/Khan/aphrodite) 实现的上一个示例：

```
import { StyleSheet, css } from 'aphrodite';
const styles = StyleSheet.create({
    myStyle: {
        fontSize: 24,
        lineHeight: '1.3em',
        fontWeight: 'bold',
    }
});

<span className={css(styles.myStyle)}>Hello World!</p>
```



其他第三方库推荐：

- [Emotion](https://emotion.sh/)
- [JSS](http://cssinjs.org/)
- [Radium](https://formidable.com/open-source/radium/)
- [Styled-components](https://www.styled-components.com/) 

搭配用于在JavaScript中编写样式的轻量级工具集[polished](https://polished.js.org/)，可以获得更好的体验。



参考文章

https://www.jianshu.com/p/d30d0b0705db

https://segmentfault.com/a/1190000017543565

https://segmentfault.com/p/1210000011172751/read



在这个 [页面](https://css-in-js-playground.com/) 中，您可以测试和比较许多 CSS-in-JS 的库。



> 还有其他库正在进一步采用 CSS，JavaScript和类型的概念。其中一个库是 [stylable](https://github.com/wix/stylable)，一个基于组件的库，带有一个预处理器，可以将 stylable 的 CSS 转换成最小的跨浏览器的 vanilla CSS。



目前大多数项目都采用了CSS-Modules来避免命名冲突，适合的才是最好的。

- 通用UI模式，适合采用BEM规范或类网易的单字母前缀命名。推荐`bootstrap`样式框架的编码规范，同时结合`BEM`命名规范，灵活使用。
- 独立组件模式，适合采用CSS-Modules或css-in-js。

>  BEM使用应该适量，适用于模块化的html结构。
>
> 避免全篇使用，会导致class命名冗余。并且用预处理器拼接出来的class名称，在维护代码时，不方便定位。



## 代码风格

### 编码

统一字符编码utf-8 

```
charset 'utf-8';
```



### 缩进

使用 `4` 个空格作为一个缩进层级，不允许使用 `2` 个空格或 `tab` 字符。

```css
.selector {
    margin: 0;
    padding: 0;
}
```



### 分号

每个属性声明末尾都要加分号

```css
.selector {
    width: 100%;
    height: 100%;
}
```



### 空格

- `:` 与属性值之间需要空格，与属性名之间不需要空格
- 属性值中的 `,` 后需要空格，`,` 前不需要空格
- 选择器 `> + ~` 等前后需要空格
- 选择器与 `{` 之间需要空格
- `/` 前后需要空格
- 注释 `/*` 后和 `*/` 前需要空格

```css
.selector > .wrapper {
    font-family: "Hiragino Sans GB", sans-serif;
    background: rgba(0, 0, 0, 0.5) url(logo.png) no-repeat center / contain;
    height: 100%;
}
```



### 空行

- 两个选择器属性块之间保留一个空行
- 代码块注释前与代码块后保留一个空行

```css
.wrapper {
    height: 100%;

    /* 字体相关 */
    font-family: 'DINPro';
    font-size: 16px;
    font-weight: 700;

    background: #000;
}

.selector {
    height: 100%;
}
```



### 换行

- 当一个规则包含多个选择器时，每个选择器声明必须独占一行
- 每个属性定义必须另起一行，且必须带上分号
- `{` 后需要换行，`}` 前需要换行

```css
.wrapper,
.selector {
    width: 100%;
    height: 100%;
}
```



### 引号

- 引号统一使用双引号
- 属性选择器中的属性值需要引号

```css
[class="demo"]::after {
    content: "";
}
```



### 颜色

- 16 进制颜色使用小写字母
- 16 进制颜色尽量使用简写

```css
/* good */
.selector {
    color: #abc;
}

/* bad */
.selector {
    color: #AABBCC;
}
```



### 简写

属性可以简写时，尽量采用简写方式，可以精简代码且提高阅读体验。

（1）如padding,margin,font,color等等

（2）小数点前面的'0'建议去除

（3）使用十六进制表示颜色值， 在可能的情况下，可以进行缩写，比如：#abf,#ccc

```css
/* better */
.selector {
    background: rgba(0, 0, 0, 0.5) url(logo.png) no-repeat center / contain;
}

/* bad */
.selector {
    background-color: rgba(0, 0, 0, 0.5);
    background-image: url(logo.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
```



### 顺序

遵循 ：布局属性-->自身属性-->文本属性-->其他属性。

1. 布局属性，如定位、层级、显示等，影响文档流（比如：`display / position / float / clear / visibility / top / right / z-index` 等）
2. 自身属性，盒模型等（比如：`width / height / margin / padding / border` 等）
3. 文本属性，排版相关（比如：`font / line-height / letter-spacing / text-align / vertical-align` 等）
4. 装饰属性（比如：`color / background / opacity / cursor` 等） 
5. CSS3 新特性（比如：`transform / transition / animation` 等）



### 嵌套

（1）嵌套层级不超过3个层级。

```
.outer .inner .innercontent{
    // no more!
}
```



### 注释

- css文件必须书写顶部注释，标明该文件隶属模块
- 统一使用 `/* */` 进行注释
- 缩进与下一行代码保持一致
- 可位于一个代码行的末尾，与代码间隔一个空格
- 一个规则中有多条声明时，每条声明应独占一行；只有一条声明，整个规则可以写为一行

```css
.wrapper,
.selector {

    /* 字体相关 */
    font-family: 'DINPro';
    font-size: 16px;
    font-weight: 700; /* 字重 */
}
```



### 引用

**引用样式文件：**避免在css中用@import，使用sass或less等时除外，less使用@import，需避免在css中生成@import代码。

**引用图片：**使用PNG格式时，使用场景为单色背景、图中主要颜色不超过3种的，应采用PNG-8编码保存。其它场合下，采用PNG-24保存。推荐单个图片体积在10kb以下时，应考虑在css中以base64编码内联提供，不单独提供图片文件。



### 特性

根据项目的兼容性选择采用适合的特性。如移动端可使用 `flexbox` 布局，需兼容低版本 IE 项目除外。

```css
.selector {
    display: flex;
    justify-content: center;
    align-items: center;
}
```



### 其他

- 不允许有空的规则
- 元素选择器用小写字母
- 属性值 `0` 后面不要加单位
- 无前缀的标准属性应该写在有前缀的属性后面
- 不要在一个文件里出现两个相同的规则
- 发布的代码中不要有 `@import`
- 尽量不用 `*` 选择器
- 非特殊场景尽量少使用!important，如果使用须添加必要的注释
- 字符串和超链接使用单引号包裹,内部出现其他冲突符号建议使用转义字符
- 运算上,使用通用计算思维考虑,最高级别的用小括号包裹
- 尽量少使用将样式的定义写在标签中（如内联样式：style="color:red;"），或用js为元素添加内联样式

## SCSS规范

[SCSS入门](https://www.sass.hk/)

[Sass进阶](https://www.jianshu.com/p/bd2b221260b8)



### 结构

建议使用模块化写法,每个组件单独写个scss文件,通过@import来汇总成一个主scss文件,这样非常有利于维护;

### 变量

变量上,有可能复用的引用,应该赋值给变量;对于偶尔使用的,推荐使用%placeholder占位符变量;

### 注释

通用样式必须注明作用

```
.overlay {
  // modals are 6000, saving messages are 5500, header is 2000
  z-index: 5000; 
}
```

### mixin

混合宏(mixin),在传入CSS3阴影这类多参数的值时,应该使用

```
@mixin shadows($shadows...) {

}
```

### 条件

循环条件判断可以参考JS的规范写法

```
@if (true){
} @else (){
}
```

### 顺序

@extend在前,@include,常规样式在后,伪类在最后

```
.test {
  @extend %module; 
  @include transition(all 0.3s ease-out);
  background: #000;
    &:hover {
    background: DarkCyan;
  }
  &::before {
    content: "";
    display: block;
  }
  ...
}
```

### map

map上,推荐json的写法;

```
'name': 'CRPER', //冒号后空格再写值,逗号结尾
'mage': 22,  //每个值对独占一行
```

### 嵌套

在scss中可以嵌套选择器，可以提升代码的简洁性和可读性，但是应该尽量避免使用没有任何内容的选择器。

应遵循scss嵌套顺序：

- 当前选择器的@extend和@include
- 当前选择器的样式属性
- 父级选择器的伪类选择器（:first-child,:active等）
- 伪类元素（:before,:after）
- 父级选择器的声明样式
- 用 scss 的上下文媒体查询
- 子选择器

嵌套最好不过三,有利于阅读,也有利于维护

```
.outer {
  .inner {
    innercontent {
      // no more!
    }
  }
}
```

嵌套中,不仅仅考虑使用CSS的写法,跟应该使用新属性&来减少变量名的书写,方便阅读和引用正确

```
a{
   &:link,
    &:visited{
       color:#000;
   }
   &:hover{
           color:#000;
   }
}
```



嵌套中,属性根据类型进行排序（position, display, colors, font, miscellaneous…）,类型之间隔行

```
.container{
    /定位/
    position:absolute;
    left:50%;
    top:50%;
   transform:translate(-50%,-50%);

   /盒子类型/
   display:block;

  /颜色控制/
   color:#000;
   background-color:#f00;
   border-color:#ff0;

  /字体设置/
  font-family:"微软雅黑";
  font-size:15px;
  font-weight:700;
  line-height:30px;
  text-decoration:none;
  work-break:break-all;

  /阴影设置/
  text-shadow: 1px 1px 1px rgba(0,0,0,.5);
  box-shadow: 1px 1px 1px rgba(0,0,0,.5);

```



