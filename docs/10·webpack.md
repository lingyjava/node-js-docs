# 10·webpack



## what’s this

[webpack](https://webpack.js.org/) 是用于 JS 应用程序的静态模块打包工具。webpack 在内部从一个或多个入口构建一个依赖图，将项目中所需的每个模块组合成一个或多个 bundles，均为静态资源，用于展示内容。

静态模块指 HTML，CSS，JS，图片等固定内容的文件。

打包（工程化）：将静态模块内容，压缩，整合，转译等。

- 把 Less / Sass 转成 CSS 代码。
- 把 ES6+ 降级成 ES5.
- 支持多种模块标准语法。

## 安装

使用命令 `npm i webpack webpack-cli --save-dev` 安装。

运行 webpack 5 的 Node.js 最低版本是 10.13.0 (LTS)。

[webpack-cli](https://github.com/webpack/webpack-cli)：用于在命令行中运行 webpack.

[webpack中文文档](https://www.webpackjs.com/guides/getting-started/)

## 使用

在 package.json 文件中添加一级对象，配置局部自定义 build 命令：

```json
"scripts": {
    "test": "echo \"Error\" && exit 1 ",
    "build": "webpack"
}
```

运行打包命令 `npm run build` 自动产生 dist 分发文件夹（压缩和优化后，用于最终运行的代码）。

## 配置

Webpack 配置影响打包过程和结果。

在项目根目录，新建 webpack.config.js 配置文件，导出配置对象，配置入口、出口路径等。

只有和入口产生直接 / 间接的引入关系，才会被打包。

```js
const path = require('path')

module.exports = {
    // 输入文件
    entry: path.resolve(__dirname, 'src/index.js'),
    // 输入文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './index.js'
    }
}
```

## 生成 html 文件

插件 html-webpack-plugin： 在 Webpack 打包时生成 html 文件。

使用命令 `npm i html-webpack-plugin --save-dev` 安装。

在 webpack.config.js 文件中配置。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    plugins:[
        new HtmlWebpackPlugin({
            // 模板文件
            template: './public/index.html',
            // 输出文件
            filename: './index.html'
        })
    ]
}
```

## 打包 css 代码

加载器 css-loader：解析 css 代码。

加载器 style-loader：把解析后的 css 代码插入到 DOM.

使用命令 `npm i css-loader style-loader --save-dev` 安装。

准备 css 文件代码引入到 js 中（压缩转译处理等）。

在 webpack.config.js 中配置。

```js
module.exports = {

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}
```

Webpack 默认只识别 js 代码。

## 提取 css 代码

插件 mini-css-extract-plugin：提取 css 代码。

使用命令 `npm i mini-css-extract-plugin` 安装。

在 webpack.config.js 中配置。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    
    plugins:[
        new MiniCssExtractPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    }
}
```

注意：不能和 style-loader 一起使用。

优点：css 文件可以被浏览器缓存，减少 js 文件体积。

## 压缩 css 代码

使用 css-minimizer-webpack-plugin 插件压缩 css 代码。

`npm i css-minimizer-webpack-plugin --save-dev`

在 webpack.config.js 中配置。

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    // 优化
    optimization: {
        // 压缩 css
        minimizer: [
            // 在 webpack@5 中使用 ... 来扩展现有的 minimizer
            '...',
            new CssMinimizerPlugin()
        ]
    }
}
```

## 打包 less 代码

加载器 less-loader：把 less 代码编译为 css 代码。

`npm i less less-loader --save-dev`

less-loader 需要配合 less 软件包使用。

在 webpack.config.js 中配置。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {

    plugins:[
        new MiniCssExtractPlugin()
    ],

    module: {
        rules: [
            // ****** 打包 less 文件 *****
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            }
        ]
    }
}
```

## 打包图片

资源模块：Webpack5 内置资源模块（字体，图片等）打包，无需额外 loader.

在 webpack.config.js 中配置。

```js
module.exports = {
    module: {
        rules: [
            // ******* 打包图片 ******
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'assets/[hash][ext][query]'
                }
            }
        ]
    }
}
```

- 【hash】占位符：对模块内容做算法计算，得到映射的数字字母组合的字符串。
- 【ext】占位符：使用当前模块原本的占位符，例如：.png / .jpg 等字符串。
- 【query】占位符：保留引入文件时代码中查询参数（只有 URL 下生效）。

- 文件大小临界值默认为 8KB。
  - 大于 8KB ：发送一个单独的文件并导出 URL 地址。
  - 小于 8KB ：导出一个 data URI（base64字符串）。

## 搭建开发环境

配置 webpack-dev-server 快速开发应用程序，启动 Web 服务，自动检测代码变化，热更新到网页。

dist 目录和打包内容是在内存里（更新快）。

使用命令 `npm i webpack-dev-server --save-dev` 下载。

设置模式为开发模式，并配置自定义命令 dev.

```json
"scripts": {
    "test": "echo \"Error\" && exit 1 ",
    "build": "webpack",
    "dev": "webpack serve --open"
}
```

使用 `npm run dev` 启动开发服务器。

### 打包模式

打包模式：告知 Webpack 使用相应模式的内置优化。

- 开发模式（development）：调试代码，实时加载，模块热替换等。
- 生产模式（production）：压缩代码，资源优化，更轻量等。

---

设置方式

1. 在 webpack.config.js 配置文件设置 mode 选项。

   ```js
   module.exports = {
   
       // 设置打包模式
       // mode: 'production',
       // mode: 'development',
   }
   ```

2. 在 package.json 命令行设置 mode 参数（命令行设置的优先级高于配置文件中，推荐使用）。

   ```json
   "scripts": {
       "dev": "webpack serve --mode=development"
   }
   ```

   