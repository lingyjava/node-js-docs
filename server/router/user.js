const express = require('express')
const router = express.Router()

const userHandler = require('../router_handler/user')

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 验证规则对象
const { reg_login_schema } = require('../schema/user')


// 声明局部中间件，对当前请求中携带的数据进行验证
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)
router.post('/login', userHandler.login)

module.exports = router