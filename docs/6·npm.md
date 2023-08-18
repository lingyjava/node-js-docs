# 6·npm

- [6·npm](#6npm)
  - [what’s this](#whats-this)
  - [包](#包)
  - [配置文件](#配置文件)
  - [切换源](#切换源)
  - [全局包](#全局包)
  - [包结构](#包结构)
  - [包发布](#包发布)
  - [模块加载机制](#模块加载机制)


## what’s this

包管理工具 Node Package Manager 简称 npm，具随着 Node.js 一起安装。

使用 npm -v 命令，查看所安装的 npm 包管理工具的版本号。

## 包

Node.js 中的第三方模块又叫做包。包是基于内置模块封装出来的，提供了更高级、更方便的 API，提高开发效率。

想在项目中安装指定名称的包，需要运行如下的命令：

`npm install 包名称`，

简写为：

 `npm i 包名称`

默认自动安装最新版本的包，若要指定版本，使用命令：

`npm i 包名称@版本号`


导入包，使用命令：

`require()`

## 配置文件

装包完成后，会在文件夹下生成 node_modules 的文件夹和 package-lock.json 的配置文件。

node_modules 文件夹用来存放所有已安装到项目中的包。第三方包的体积过大，共享时应剔除该文件夹。

package-lock.json 配置文件用来记录 node_modules 目录下的每一个包的下载信息。

---

**package.json 文件**

 运行 npm install 命令安装包的时候，npm 包管理工具会自动把包的名称和版本号记录到 package.json 中，

在执行命令时所处的目录中，快速创建 package.json，使用命令：`npm init -y`

package.json 文件中的 dependencies 节点，用来记录使用 npm install 命令安装了哪些包。

package.json 文件中的 devDependencies 节点，用来记录如果某些只在项目开发阶段会用到的包。



读取 package.json 文件中的 dependencies 节点获取所有依赖包的名称和版本，一次性安装所有的包，使用命令：`npm install` ，或简写为 `npm i`。

运行 `npm uninstall` 命令，来卸载指定的包，并自动从 package.json 的 dependencies 中移除掉。

## 切换源

```bash
# 查看当前的源
npm config get registry
# 切换下载源
npm config set registry=http://registry.npm.taobao.org/
```

## 全局包

安装到项目 node_modules 目录中的包，都是项目包。

项目包又分为两类：

- 开发依赖包（记录到 devDependencies 节点中的包，只在开发期间会用到）
- 核心依赖包（记录到 dependencies 节点中的包，在开发期间和项目上线之后都会用到）



在执行 npm install 命令时，如果提供了 -g 参数，则会把包安装为全局包。

全局包会被安装到 C:\Users\用户目录\AppData\Roaming\npm\node_modules 目录下。

只有工具性质的包，才有全局安装的必要性。因为它们提供了好用的终端命令。

```bash
# 全局安装指定的包
npm i 包名 -g
# 卸载全局安装的包
npm uninstall 包名 -g
```

## 包结构

一个规范的包，它的组成结构，必须符合以下 3 点要求：

- 包必须以单独的目录存在。
- 包的顶级目录下要必须包含 package.json 这个包管理配置文件。
- package.json 中必须包含 name，version，main 这三个属性，分别代表包的名字、版本号、包的入口。

## 包发布

注册完成 npm 账号后，在终端中执行 `npm login` 命令，依次输入用户名、密码、邮箱。

将终端切换到包的根目录之后，运行 `npm publish` 命令，即可将包发布到 npm 上，包名不能重复。

运行命令 `npm unpublish 包名 --force` ，从 npm 删除已发布的包。

## 模块加载机制

不论是内置模块、用户自定义模块、还是第三方模块，在第一次加载后会被缓存。 这也意味着多次调用 require() 不会导致模块的代码被执行多次。



内置模块加载机制：

- 重名时加载优先级最高。

---

自定义模块的加载机制：

- 必须指定以 ./ 或 ../ 开头的路径标识符，否则 node 将当作内置模块或第三方模块进行加载。
- 如果省略了文件的扩展名，则 Node.js 会按顺序分别尝试加载以下的文件：
  - 按照确切的文件名进行加载。
  - 按照确切的文件名进行加载。
  - 补全 .json 扩展名进行加载。
  - 补全 .node 扩展名进行加载。
  - 加载失败。

---

第三方模块的加载机制：

- 如果传递给 require() 的标识符不是一个内置模块，也没有以 ‘./’ 或 ‘../’ 开头，则 Node.js 从当前模块的父 目录开始，尝试从 /node_modules 文件夹中加载第三方模块。
- 如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。

---

当把目录作为标识符，传递给 require() 进行加载时：

1. 在目录下查找 package.json 的文件，寻找 main 属性，作为 require() 加载的入口。

2. 如果目录里没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件。
3. 加载失败。



