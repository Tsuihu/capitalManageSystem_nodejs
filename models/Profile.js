const mongoose = require('mongoose')
// 创建Schema（模式）对象
const Schema = mongoose.Schema
// 给文档创建模式结构
const ProfileSchema = new Schema({
  type: {
    type: String
  },
  describe: {
    type: String,
  },
  income: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  },
  date: {
    type: Date,
    default:Date.now
  }
})
// 通过Schema创建Model，model相当于mongodb中的collection
const model = mongoose.model("profile",ProfileSchema)

module.exports = Profile = model