# 3·path模块

- [3·path模块](#3path模块)
  - [path是什么](#path是什么)
  - [path.join()](#pathjoin)
  - [path.basename()](#pathbasename)
  - [path.extname()](#pathextname)

## path是什么
path模块是Node.js官网提供的用来处理路径的模块，提供了一系列的方法和属性。

| api             | 作用                                     |
| --------------- | ---------------------------------------- |
| path.join()     | 用来将多个路径拼接成一个完整的路径字符串 |
| path.basename() | 用来从路径字符串中解析出文件名 |

要在js代码中使用path模块，则需要使用以下方式导入它：
`const path = require('path')`

## path.join()
path.join()方法可以将多个路径拼接成一个完整的路径字符串，语法格式如下：
`path.join([...paths])`

参数解读：
- `...paths<string>`：路径片段的序列。
- 返回值：字符串。

[示例代码](../code/path.js)

## path.basename()
path.basename()方法可以获取路径中最后一部分，通过这种方式获取路径中的文件名，语法格式如下：
`path.basename(path[, ext])`

参数解读：
- path`<string>`：必选参数，字符串，表示一个文件路径。
- ext`<string>`：可选参数，表示需要去除的文件扩展名。
- 返回值：字符串类型，表示文件路径中最后一部分。

[示例代码](../code/path.js)

## path.extname()
path.extname()方法可以获取路径中的扩展名部分，语法格式如下：
`path.extname(path)`

参数解读：
- `path<string>`：必选参数，表示一个文件路径。
- 返回值：字符串类型，扩展名字符串。

[示例代码](../code/path.js)