# 2·fs模块

- [2·fs模块](#2fs模块)
  - [fs是什么](#fs是什么)
  - [readFile()](#readfile)
  - [writeFile()](#writefile)
  - [路径动态拼接问题](#路径动态拼接问题)

## fs是什么
fs（file system）文件系统模块，Node.js官方提供的用来操作文件的模块。提供了一系列方法和属性。

| api            | 作用               |
| -------------- | ------------------ |
| fs.readFile()  | 读取指定文件的内容 |
| fs.writeFile() | 向指定文件写入内容 |

想要在js中使用fs模块，使用以下方式导入它`const fs = require('fs')`.

## readFile()
fs.readFile()方法可以读取指定文件的内容，语法格式如下：
`fs.readFile(path[, options], callback)`

参数解读：
- path：必选参数，字符串，表示文件的路径。
- options：可选参数，字符串，表示以什么编码格式来读取文件。
- callback：必选参数，文件读取完成后，通过回调函数拿到读取的结果。
  - 回调函数有err（错误信息）、dataStr（文件数据）两个参数。
  - 读取失败时err为错误对象，dataStr为undefined.
  - 读取成功时err为null.

[示例代码](../code/fs.js)


## writeFile()
fs.writeFile()方法可以向指定文件写入内容，语法格式如下：
`fs.writeFile(file, data[, options], callback)`

参数解读：
- file：必选参数，字符串，表示文件的存放路径。
- data：必选参数，字符串，表示要写入的内容。
- options：可选参数，字符串，表示以什么格式写入文件内容，默认值utf8.
- callback：必选参数，文件写入完成后的回调函数。
  - 回调函数有err（错误信息）参数。
  - 写入成功时，err为null.
  - 写入失败时，err为错误对象。

[示例代码](../code/fs.js)

## 路径动态拼接问题
使用fs模块操作文件时，如果提供的是相对路径，容易出现路径动态拼接错误的问题。
原因：代码运行时，以执行node命令时所处的目录，动态拼接被操作文件的完整路径。

解决方案：
- 直接提供完整的文件路径（绝对路径）。
- `__dirname`表示当前文件所处的目录，通过该参数拼接出文件的相对路径。

