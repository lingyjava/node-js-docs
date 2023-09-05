const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {

    // 设置打包模式
    // mode: 'production',
    // mode: 'development',

    // ******** 打包 js 文件 ************
    // 输入文件
    entry: path.resolve(__dirname, 'src/index.js'),
    // 输入文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './index.js'
    },

    plugins:[
        // ****** 打包 html 文件 *******
        new HtmlWebpackPlugin({
            // 模板文件
            template: './public/index.html',
            // 输出文件
            filename: './index.html'
        }),
        new MiniCssExtractPlugin()
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
        ]
    }
}