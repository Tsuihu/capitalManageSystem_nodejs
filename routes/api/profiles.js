// 登录 注册 api
const express = require('express')
const router = express.Router()
const passport = require('passport')
const Profile = require('../../models/Profile')

// GET      api/profiles/test
// @desc    返回请求的json数据
// @access  public
router.get('/test',(req,res) => {
  res.json({
    msg: 'profile works'
  })
})

// POST     api/profiles/add
// @desc    添加
// @access  pravite
router.post('/add',passport.authenticate('jwt',{session:false}),(req,res) => {
  const profileFiedlds = {}
  if(req.body.type) profileFiedlds.type = req.body.type
  if(req.body.describe) profileFiedlds.describe = req.body.describe
  if(req.body.income) profileFiedlds.income = req.body.income
  if(req.body.expend) profileFiedlds.expend = req.body.expend
  if(req.body.cash) profileFiedlds.cash = req.body.cash
  if(req.body.remark) profileFiedlds.remark = req.body.remark
  new Profile(profileFiedlds).save().then(profile => {
    res.json(profile)
  })
})

// GET      api/profiles
// @desc    获取信息全部
// @access  pravite
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
  Profile.find()
  .then(profile => {
    if(!profile){
      return res.status(404).json('没有任何内容')
    }
    res.json(profile)
  })
  .catch(err => res.status(404).json(err))
})

// GET      api/profiles/:id
// @desc    获取信息单个
// @access  pravite
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
  Profile.findOne({_id:req.params.id})
  .then(profile => {
    if(!profile){
      return res.status(404).json('没有任何内容')
    }
    res.json(profile)
  })
  .catch(err => res.status(404).json(err))
})

// POST     api/profiles/edit/:id
// @desc    编辑信息
// @access  pravite
router.post('/edit/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
  const profileFiedlds = {}
  if(req.body.type) profileFiedlds.type = req.body.type
  if(req.body.describe) profileFiedlds.describe = req.body.describe
  if(req.body.income) profileFiedlds.income = req.body.income
  if(req.body.expend) profileFiedlds.expend = req.body.expend
  if(req.body.cash) profileFiedlds.cash = req.body.cash
  if(req.body.remark) profileFiedlds.remark = req.body.remark
  Profile.findOneAndUpdate(
    {_id: req.params.id},
    {$set:profileFiedlds},
    {new:true}
  ).then(profile => res.json(profile))
})

// POST     api/profiles/delete/:id
// @desc    删除信息
// @access  pravite
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
  Profile.deleteOne({_id:req.params.id},(err,docs) => {
    if(err) return res.json('删除失败')
    res.json(docs)
  })
})

module.exports = router