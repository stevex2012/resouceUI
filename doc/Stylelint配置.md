## 为什么选择用 stylelint ？

这个问题有两层含义，一是为什么要使用这个样式代码风格检查工具，二是与其他工具相比，为什么选择 [stylelint](https://stylelint.io/) 而不是其他如 [stylefmt](https://github.com/morishitter/stylefmt) 等。

### 使用 linter 的原因

对于第一个问题，相信很多小伙伴都会被历史遗留的，或多人协同开发写下的风格不一的样式代码困扰过，最基本的就是换行、缩进和空格之争，大家对此应该都不陌生。特别是有时候你可能会遇上如下祖传代码：

```
#idA .classB,.classC{position:absolute;top: 0;left:0; display:-webkit-flex;display: flex;width:100%;background:url(../pic.png) no-repeat;-webkit-background-size:contain;background-size:contain }
```

这段代码从我个人风格来看存在不少问题：

1. 不推荐使用 id 选择器来定义样式；
2. 多重选择器（multiple selectors）没有换行，不清晰直观；
3. 多个 css 规则没有换行，挤在单行太长；
4. 使用了 `-webkit-` 前缀，但是项目中已经支持 `autoprefixer` ；
5. 属性和值之间的空格时有时无等。

当然代码风格因人而异，所以才需要团队统一。在一些早期缺乏完善的代码评审等制度的项目中，很容易由于程序员的偷懒图方便或在一时的紧急粗糙赶工中积累下一坨对团队其他成员不太友好、可阅读性低、较难维护的 css 。

### 同类工具比较

至于第二个问题，选择 stylelint 的原因也很简单，它是当前所有[同类工具中](https://www.cnblogs.com/BlackStorm/archive/2019/01/06/add-stylelint-to-your-vue-project.html)使用人数最多的，社区较为活跃，仍在持续维护。而且正如这个 [issue](https://github.com/vuejs-templates/webpack/issues/836#issuecomment-320153329) 中提到，当下很多大厂都在使用，如 github 的 [primer](https://styleguide.github.com/primer/) 体系就定制了一套自己的[规则](https://styleguide.github.com/primer/tools/linting/#configuration)`stylelint-config-primer` 。

![img](https://img2018.cnblogs.com/blog/720130/201901/720130-20190103145613284-879108423.png)

至于 stylefmt 也曾经被推荐与 stylelint 搭配组合，不少博文都有提到。但是官方已经不推荐继续使用，直接用 stylelint 的 `--fix` 选项即可。

> NOTICE: Consider other tools before adopting stylefmt
> If you are using stylefmt with stylelint configuration to format according to its rules, you can now use stylelint's --fix option (from v7.11.0) to autofix.
>
> Another on the other hand, prettier supports to format not only JavaScript but also CSS, SCSS and Less code.

而没有考虑 [prettier](https://prettier.io/) 的原因则是它希望提供一套官方自己认可的统一风格规范，而不仅仅是个 linter 或者 formatter ，可配置项很少，定制自由度较低，不适合想要自己搞事情的团队，更适合个人开发者去使用。



## 如何开始使用

### 安装依赖

其实官方的 User guide 已经很全面，与 eslint 是非常相似的。

1. 安装 stylelint

   ```
   npm i -D stylelint stylelint-config-stand
   ```

   后者 `stylelint-config-stand` 不是必需的，也可以自己根据文档从零开始配置规则，或者用第三方如 github 的规则 `stylelint-config-primer` 。

2. 安装适配预处理语法的插件

   以 sass 为例：

   ```
   npm i -D stylelint-scss
   ```

   不过 stylus 目前没有发现可用性高的相关插件，也导致 stylelint 不能解析 stylus 语法。

3. 安装 webpack 插件

   ```
   npm i -D stylelint-webpack-plugin
   ```

### 命令行使用

stylelint 搜索目录和文件使用的是 glob 规则：

```
npx stylelint --cache **/*.{html,js,css,sass,scss} --fix
```

`--cache` 选项可以指定使用缓存，默认生成的 `.stylelintcache` 文件放置于执行目录中， `--fix` 选项可以指定 stylelint 自动修复不符合可修复规则的代码，其他更多选项可以参考官方文档。

但需要注意有一个问题，**在没有配置使用 stylelint-scss 之类的插件前**， stylelint 是不能直接解析 js 文件、 html 文件等的，会报出一堆错误：

```
1:1  ✖  Unknown word   CssSyntaxError
```

我们可以用内置的自定义语法 `postcss-html` 来解析（不需安装）：

```
npx stylelint **/*.{html,vue} --custom-syntax postcss-html
```

也可以用内置的 scss 语法支持来解析 css 文件：

```
npx stylelint **/*.{css,sass,scss} --syntax scss
```

### 通过 npm 命令运行

在 scripts 中增加对应的命令：

```
// package.json
{
    "scripts": {
        "lint:style": "stylelint **/*.{html,vue} --custom-syntax postcss-html",
        "lint:css": "stylelint **/*.{css,sass,scss} --syntax scss"
    }
}
```

或者（配置了 `stylelint-scss` 插件后）：

```
{
    "scripts": {
        "lint:css": "stylelint **/*.{html,vue,css,sass,scss}"
    }
}
```

然后可以手动在命令行运行：

```
npm run lint:css
npm run lint:css -- --fix
npm run lint:css -- --cache --fix
```

### 通过 webpack 插件运行

```
// webpack.conf.js
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    ...
    'plugins': [
        ...
        new StyleLintPlugin({
            'files': ['**/*.{html,vue,css,sass,scss}'],
            'fix': false,
            'cache': true,
            'emitErrors': true,
            'failOnError': false
        })
    ]
};
```

stylelint 支持的所有命令行选项都可以在初始化插件时传递 options 来指定，包括上文提到的 `--syntax` 等。更多可以参考 `stylelint-webpack-plugin` 官方文档。



## 编写配置

### 配置对象

stylelint 支持 cosmiconfig 的配置方式，按如下顺序查找配置对象：

- 在 `package.json` 中的 `stylelint` 属性
- JSON / YAML / JS 格式的 `.stylelintrc` 文件（可带后缀）
- 导出 JS 对象的 `stylelint.config.js` 文件

它的配置也非常简单，只有 `rules` 、 `extends` 、 `plugins` 、 `processors` 、 `ignoreFiles` 和 `defaultSeverity` 。

其中 `defaultSeverity` 只支持 `"warning"` 和 `"error"` 两种，用于定义全局默认的报错等级。但是它没有相应的 cli 选项，实际上不太好用——比如你想 `stylelint-webpack-plugin` 只是警告，而 git-hooks 则是直接报错不允许提交的时候。文档上关于如何对规则单独配置错误等级有一句话提到了如何去控制：

> Different reporters may use these severity levels in different way, e.g. display them differently, or exit the process differently.

但是却没有在其他地方或者 Developer guide 中找到任何与 reporters 有关的信息，有可能是需要自己写一个 formatter 。

一个简单的配置示例：

```
// stylelint.config.js
module.exports = {
    'defaultSeverity': 'error',
    'extends': [ 'stylelint-config-standard' ],
    'plugins': [ 'stylelint-scss' ],
    'rules': {
        // 不要使用已被 autoprefixer 支持的浏览器前缀
        'media-feature-name-no-vendor-prefix': true,
        'at-rule-no-vendor-prefix': true,
        'selector-no-vendor-prefix': true,
        'property-no-vendor-prefix': true,
        'value-no-vendor-prefix': true
    }
};
```

由于可以用 `stylelint-scss` 去解析文件中的 scss 代码，我们暂时不需要使用官方列出的任何 `processors` 。

### 忽略文件

虽然可以通过配置 `ignoreFiles` 来简单实现，但是我们可能期望在一些遗留的老旧代码上先暂时不启用 stylelint ，等后续再慢慢放开，这样的话需要配置的文件路径就有点多了。为了方便我们可以再编写一个 `.stylelintignore` 文件，它的语法是跟 `.gitignore` 和 `.eslintignore` 一样的：

```
# .stylelintignore
# 旧的不需打包的样式库
*.min.css

# 其他类型文件
*.js
*.jpg
*.woff

# 测试和打包目录
/test/
/dist/

# 通过反取忽略目录
/src/component/*
!/src/component/CompA
!/src/component/CompB
# 这样的效果是除 CompA 和 CompB 外其他目录都会被忽略
```

更多可以参考 [`node-ignore`](https://github.com/kaelzhang/node-ignore) 。



### stylelint 与 eslint 同时使用 git-hooks 配置

如果项目中已经在用 husky 的 `pre-commit` 钩子来运行 eslint ，现在要加 stylelint 其实很简单：

```
// package.json
{
    ...
    "lint-staged": {
        "*.{vue,js,jsx}": [
            "eslint --fix",
            "git add"
        ],
        "*.{html,vue,css,sass,scss}": [
            "stylelint --fix",
            "git add",
        ]
    },
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged",
        }
    }
}
```

唯一需要注意的是， lint-staged 默认是并行运行的，同时对 `.vue` 文件做 `git add` 会不会有冲突？暂时未在网上见相关讨论，我自己运行也没有任何问题，如果实在担心的话，可以将 glob 匹配分开定义。

### 局部禁用规则

也是跟 eslint 类似的，我们可以通过 `stylelint-disable` 注释来局部禁用某一项规则。

```
<style>
    /* stylelint-disable selector-no-vendor-prefix, property-no-vendor-prefix, value-no-vendor-prefix */
    .classA {
        -webkit-transition-property: -webkit-transform;
        transition-property: -webkit-transform;
        -o-transition-property: transform;
        /* stylelint-disable declaration-block-no-duplicate-properties */
        transition-property: transform;
        transition-property: transform, -webkit-transform;
        /* stylelint-enable */
    }
</style>
```

但是随之而来的是一个常见错误：你在文件头部忽略了对浏览器前缀的提示，却在另一个遥远的地方由于暂时性允许同名属性，通过 `/* stylelint-enable */` 把之前所有忽略的规则都重新开启了。所以一定要注意，只 enable 对应的规则，形成呼应：

```
<style>
    .classA {
        /* stylelint-disable declaration-block-no-duplicate-properties */
        transition-property: transform;
        transition-property: transform, -webkit-transform;
        /* stylelint-enable declaration-block-no-duplicate-properties */
    }
</style>
```



## 其他注意事项

1. 解析 `.vue` 文件（单文件组件）时请勿使用 processors

   > 网上一些过时的教程包括 github 上的讨论都推荐使用 `stylelint-processor-html` 或者 `@mapbox/stylelint-processor-arbitrary-tags` 来解析 html 或 vue 中的 css ，这本身并没有什么问题，但是这个插件有个 bug ，当指定 stylelint 的 `--fix` 后将会把 vue 文件中 `<style>...</style>` 以外的部分删掉。

   使用自定义语法 `postcss-html` 或者保留 `stylelint-scss` 插件就足够了。

2. 一些规则在跑 `--fix` 选项时是有 bug 的

   比如 `declaration-block-semicolon-newline-after` 设置 `"always"` 时，不允许多条 css 规则写在一行，但自动修复后可能会出现缩进不正确：

   ```
   <style>
       .classA {
           display: block;
       }

       a { color: pink; top: 0; }
   </style>
   ```

   修复后（示例，之前配置时没尝试去找必现路径）：

   ```
   <style>
       .classA {
           display: block;
       }

       a {
   color: pink;
   top: 0;
   }
   </style>
   ```

   如果你也出现这种情况，可以再指定 `indentation` 规则的基准缩进（ `baseIndentLevel` ）：

   ```
   module.exports = {
       ...
       rules: {
           ...
           'indentation': [2, {
               'baseIndentLevel': 1,
           }],
           'declaration-block-semicolon-newline-after': 'always'
       }
   };
   ```



## 参考链接

1. [Prettier + Stylelint: Writing Very Clean CSS (Or, Keeping Clean Code is a Two-Tool Game)](https://css-tricks.com/prettier-stylelint-writing-clean-css-keeping-clean-code-two-tool-game/)
2. [如何在Vue+Webpack下配置Stylelint - 简书](https://www.jianshu.com/p/8a33aa5e34b5)
3. [vue单文件组件lint error自动fix及styleLint报错自动fix - segmentfault](https://segmentfault.com/a/1190000013581260)
4. [Stylelint in .vue - 掘金](https://juejin.im/post/5a2c19d351882531ba10df83)