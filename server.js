const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

// 引入users.js
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')

// 使用bodyparser中间件(解析响应内容)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// DB数据库配置
const db = require('./configs/keys').mongoURL
// 连接数据库
mongoose.connect(db)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err))

// passport 初始化
app.use(passport.initialize())
require('./configs/passport')(passport)

// 路由
// app.get('/',(req,res) => {
//   res.send('hello world')
// })
// 使用routes
app.use('/api/users',users)
app.use('/api/profiles',profiles)

const port = process.env.PORT || 5000
app.listen(port,() => {
  console.log(`server running on port ${port} localhost:8080`)
})