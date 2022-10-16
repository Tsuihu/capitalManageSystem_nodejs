const mongoose = require('mongoose')
// 创建Schema（模式）对象
const Schema = mongoose.Schema
// 给文档创建模式结构
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  identity: {
    type: String,
    required:true
  },
  date: {
    type: Date,
    default: Date.now
  },
})
// 通过Schema创建Model，model相当于mongodb中的collection
const model = mongoose.model("users",UserSchema)

module.exports = User = model