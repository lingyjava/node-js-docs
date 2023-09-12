import '../public/index.css'
import '../public/index.less'

// const app = require('./app')
const app = require('@/app')

console.log('index test')
app.hello()

if (process.env.NODE_ENV === 'development') {
    // 仅开发环境下打印
    console.log("dev start")
}