const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpack = require('webpack')

const config = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },

    // 设置打包模式
    // mode: 'production',
    // mode: 'development',

    // ******** 打包 js 文件 ************
    // 输入文件，入口 js
    // entry: path.resolve(__dirname, 'src/index.js'),
    entry: {
        "模块1": path.resolve(__dirname, 'src/index.js'),
        "模块2": path.resolve(__dirname, 'src/login.js'),
    },
    // 输入文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './[name]/index.js'
    },

    plugins:[
        // ****** 打包 html 文件 *******
        new HtmlWebpackPlugin({
            // 模板文件
            template: './public/index.html',
            // 输出文件
            filename: './index.html',
            chunks: ["模块1"],
            // 自定义属性
            useCdn: process.env.NODE_ENV === 'development'
        }),

        new HtmlWebpackPlugin({
            template: './public/login.html',
            filename: './login.html',
            chunks: ["模块2"]
        }),

        new MiniCssExtractPlugin(),

        // 注入环境变量
        new webpack.DefinePlugin({
            // key 是注入到打包后的前端 js 代码中作为全局变量
            // value 是对应的值，此处在 cross-env 注入 node.js 中的环境变量字符串
            // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            'process.env.NODE_ENV': JSON.stringify("development") // 需要和 mode 保持一致
        })
    ],

    module: {
        rules: [
            // ***** 打包 css 文件 *******
            {
                test: /\.css$/i,
                // use: ["style-loader", "css-loader"]
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },

            // ****** 打包 less 文件 *****
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            },

            // ******* 打包图片 ******
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'assets/[hash][ext][query]'
                }
            }
        ]
    },

    // 优化
    optimization: {
        // 压缩 css
        minimizer: [
            // 在 webpack@5 中使用 ... 来扩展现有的 minimizer
            '...',
            new CssMinimizerPlugin()
        ],

        splitChunks: {
            // 所有模块动态非动态移动的做分割分析
            chunks: 'all',
            // 分割组
            cacheGroups: {
                // 抽取公共模块
                commons: {
                    // 抽取的 chunk 最小字节
                    minSize: 0,
                    // 最小引用数
                    minChunks: 2,
                    // 当前 chunk 包含已从主 bundle 中拆分出的模块，则被复用
                    reuseExistingChunk: true,
                    // 分离出模块文件名
                    name(module, chunks, cacheGroupKey) {
                        const allChunksNames = chunks.map((item) => item.name).join('~')
                        // 输出到 dist 目录下
                        return `./js/${allChunksNames}`
                    }
                }
            }
    
        }
    },

    
}

// 开发环境配置
if (process.env.NODE_ENV === 'development') {
    // 开发环境调试
    config.devtool = 'inline-source-map',

    config.externals = {
        // key: import from ... 的对象 
        // value：全局变量，最好和 cdn 暴露的一致
        'axios': 'axios'
    }
}

module.exports = config