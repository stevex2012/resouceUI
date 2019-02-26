# ESLint + Prettier

​	项目开发中，代码维护所占的时间比重往往大于新功能的开发。因此编写符合团队编码规范的代码是至关重要的，这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性，毕竟：

> 程序是写给人读的，只是偶尔让计算机执行一下。—— Donald Knuth

​	本文将讲解如何通过 ESLint 来实践团队内部的前端编码规范。

https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app

## 什么是 ESLint

[ESLint](http://eslint.org/)（[中文站点](http://eslint.cn/)）是一个开源的 JavaScript 代码检查工具，使用 Node.js 编写，由 Nicholas C. Zakas 于 2013 年 6 月创建。ESLint 的初衷是为了让程序员可以创建自己的检测规则，使其可以在编码的过程中发现问题而不是在执行的过程中。ESLint 的所有规则都被设计成可插入的，为了方便使用，ESLint 内置了一些规则，在这基础上也可以增加自定义规则。



ESLint是一个JavaScript代码静态检查工具，可以检查JavaScript的语法错误，提示潜在的bug，可以有效提高代码质量。维持前端团队高度一致的编码风格。ESLint不但提供一些默认的规则，也提供用户自定义规则来约束所写的JavaScript代码。

详细的可以参考：[ESLint中文](http://eslint.cn/)

让项目加上ESLint代码规范支持非常容易。

安装安装ESLint、ESLint loader

```
npm install --save-dev eslint@3.19.0
npm install --save-dev eslint-loader
```

逐个配置规则有点麻烦，ESLint有很多第三方配置好的格式插件，Airbnb开发配置合集就比较常用：

```
npm install --save-dev eslint-config-airbnb
```

Airbnb包括了以下三个插件需要安装：

```
npm install --save-dev eslint-plugin-import
npm install --save-dev eslint-plugin-react
npm install --save-dev eslint-plugin-jsx-a11y
```

项目根目录下创建并ESLint配置文件，.eslintrc.js：

```
module.exports = {
  // 指定校验的ECMAScript的版本及特性
  "parserOptions": {
    "ecmaVersion": 7, // ECMAScript版本，7为ES7
    "sourceType": "module", //默认script，如果代码是ECMAScript模块，设置为module
    "ecmaFeatures": { // 使用额外的语言特性
        "jsx": true // 启用JSX
    }
  },
  // 当访问未定义的变量时，no-undef 规则将发出警告
  // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量
  "env": {
    "es6": true,
    "node": true,
    "browser": true,
  },
  // 当访问未定义的变量时，no-undef 规则将发出警告
  // 脚本在执行期间访问的额外的全局变量
  "globals": {
    "document": true,
    "navigator": true,
    "window":true,
    "node":true
  },
  // 使用第三方airbnb开发配置合集
  "extends": "airbnb",
  // eslint-config-airbnb包括了以下3个插件
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  // 定义自己的规则
  "rules": {
    "comma-dangle": ["error", "never"], // 要求或禁止末尾逗号：不允许逗号
    "indent": ["error", 4], // JavaScript代码强制使用一致的缩进：4格缩进
  }
};
```

可以参照[ESLint完整规则列表](http://eslint.cn/docs/rules/)，找到并定制自己的规则。





除了在项目的构建体系中集成ESLint外，还可以使用IDE或编辑器的ESLint扩展，只选其一即可。





# ESLint 禁用检查

http://eslint.cn/docs/user-guide/configuring#disabling-rules-with-inline-comments



