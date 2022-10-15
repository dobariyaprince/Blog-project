const express = require('express')
const passport = require('passport')
const routes = express.Router()
const usercontroller = require('../../controller/usercontroller')
const passportLocal  =require('../../controller/passpost-local')


routes.post('/UserData', usercontroller.UserData )   
routes.get('/profile',usercontroller.updateprofile)
routes.post('/updateUserprofile',usercontroller.updateUserprofile) 
routes.get('/forgetpassword',usercontroller.forgetpassword)
routes.post('/sendOtp',usercontroller.sendOTP)  
routes.post('/verifyOTP',usercontroller.verifyOTP) 

routes.get('/register',usercontroller.register)
routes.get('/login',usercontroller.login)

module.exports = routes;
      