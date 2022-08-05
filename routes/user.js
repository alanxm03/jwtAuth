const routes=require('express').Router()

//requiring user.js contoller from controller

const userDetails=require('../controllers/user')

routes.use('/userAuth',userDetails)

module.exports=routes