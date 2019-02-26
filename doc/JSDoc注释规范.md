# JSDoc注释规范

[JSDoc](http://usejsdoc.org/) 是一个根据 javascript 文件中注释信息，生成 JavaScript 应用程序或库、模块的 API 文档 的工具。

你可以使用他记录如：命名空间，类，方法，方法参数等，并且很多编辑器和 IDE 都是直接支持智能提示的。[JSDoc 中文文档](http://www.css88.com/doc/jsdoc/)

> VS Code，建议安装Document this 插件



## JSDoc 注释示例

JSDoc 注释一般应该放置在方法或函数声明之前，它必须以 `/**` 开始，其他任何以 `/*`，`/***` 或者超过3个星号的注释，都将被JSDoc解析器忽略。例如：

```
/**
 * Book类，代表书本
 * @constructor
 * @param {string} title - 书本的标题
 * @param {string} author - 书本的作者
 */
class Book{
	constructor(title, author){
        this.title=title;
    this.author=author;
	}
    //属性c
    c;
    /**
     * 获取书本的标题
     * @returns {string|*}
     */
    getTitle(){
        return this.title;
    }
    /**
     * 设置书本的页数
     * @param pageNum {number} 页数
     */
    setPageNum(pageNum){
        this.pageNum=pageNum;
    }
}
```



## JSDoc 标签一览

- `{@link: ...}, {@linkplain: ...}, {@linkcode: ...}, {@tutorial: ...}`: 内联标签
- `@abstract`: 抽象，必须由继承者实现（或者覆盖）
- `@access`: 访问级别（private、public或者protected）
- `@alias`: 别名
- `@augments`: 参数
- `@author`: 作者
- `@borrows`: 借用
- `@callback`: 回调函数
- `@classdesc`: 类描述
- `@constant`: 常量
- `@constructor`: 构造函数，可以使用new创建一个实例
- `@constructs`: 构造
- `@copyright`: 版权
- `@default`: 默认值
- `@deprecated`: 弃用的
- `@desc`: 描述
- `@enum`: 枚举值
- `@event`: 事件
- `@example`: 范例
- `@exports`: 模块导出（模块化）
- `@external`: 外部模块（模块化）
- `@file`: 文件
- `@fires`: 可触发的事件
- `@global`: 全局对象
- `@ignore`: 忽略
- `@inner`: 内联对象
- `@instance`: 实例
- `@kind`: 标识类型
- `@lends`: 遍历属于同一个标识的所有属性
- `@license`: 软件授权
- `@link`: 内联
- `@member`: 成员
- `@memberof`: 属于某成员
- `@method`: 方法
- `@mixes`: 合并
- `@mixin`: 最小化
- `@module`: 模块（模块化）
- `@name`: 名称
- `@namespace`: 命名空间
- `@param`: 参数
- `@private`: 私有的（访问控制）
- `@property`: 属性
- `@protected`: 受保护的（访问控制）
- `@public`: 公开的（访问控制）
- `@readonly`: 只读的
- `@requires`: 依赖（模块化）
- `@return`: 返回值
- `@see`: 引用
- `@since`: 开始于
- `@static`: 静态的
- `@summary`: 概述
- `@this`: 解释this关键字
- `@throws`: 可能抛出的异常
- `@todo`: 待办事项
- `@tutorial`: 引用指导手册
- `@type`: 类型
- `@typedef`: 自定义类型
- `@variation`: 区分不同的对象具有相同名称的
- `@version`: 版本



## 把注释生成文档的工具

- [jsdoc](https://github.com/jsdoc3/jsdoc): 官方提供的工具
- [documentation.js](https://github.com/documentationjs/documentation): 另外一个可供选择的工具，支持生成 `html`，`markdown`， `json`
- [dox](https://github.com/tj/dox): tj 大神的作品

