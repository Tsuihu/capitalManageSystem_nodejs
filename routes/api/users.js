// 登录 注册 api
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')

const passport = require('passport')
const User = require('../../models/User')
const keys = require('../../configs/keys')

// GET      api/users/test
// @desc    返回请求的json数据
// @access  public
router.get('/test',(req,res) => {
  res.json({
    msg: 'login success'
  })
})

// POST      api/users/register
// @desc    返回请求的json数据
// @access  public
router.post('/register',(req,res) => {
  // 查询数据库，判断邮箱是否被注册
  User.findOne({email:req.body.email})
      .then(user => {
        if(user){
          return res.status(400).json({email:'邮箱已被注册'})
        }else{
          const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
          const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            avatar,
            password:req.body.password,
            identity:req.body.identity
          })
          // 对密码加密
          bcrypt.genSalt(10,function(err,salt) {
            bcrypt.hash(newUser.password,salt,(err,hash) => {
              if(err) throw err
              newUser.password = hash
              // 把加加密过的数据存储到集合
              newUser.save()
                      .then(user => res.json(user))
                      .catch(err => console.log(err))
            })
          })
        }
      })
})

// POST     api/users/login
// @desc    返回token jsonwebtoken
// @access  public
router.post('/login',(req,res) => {
  const email = req.body.email
  const password = req.body.password
  // 查询数据库
  User.findOne({email})
      .then(user => {
        if(!user){
          return res.status(404).json({email:"用户不存在"})
        }
        // 密码匹配
        bcrypt.compare(password, user.password)
              .then(isMatch => {
                if(isMatch){
                  // jwt.sign("规则","加密名字","过期时间","箭头函数")
                  const rule = {
                    id:user.id,
                    name:user.name,
                    avatar:user.avatar,
                    identity:user.identity
                  }
                  jwt.sign(rule,keys.secretOrKey,{expiresIn:10},(err,token) => {
                    if(err) throw err
                    res.json({
                      success:true,
                      token:"Bearer " + token
                    }) 
                  })
                }else{
                  return res.status(400).json({password:"密码错误"})
                }
              })
      })
})

// POST     api/users/current
// @desc    返回 current user 验证token并返回数据
// @access  private
router.post('/current',passport.authenticate('jwt',{session:false}),(req,res) => {
  res.json({
    id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    identity:req.user.identity
  })
})
 
module.exports = router