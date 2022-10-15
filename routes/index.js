const express = require('express')
const routes = express.Router()
const user = require('./user')
const passport = require('passport')
const passportLocal = require('../controller/passpost-local')
const passportGoogle = require('../controller/passpost-google')
const usercontroller = require('../controller/usercontroller')
const blogController = require('../controller/blogController')
const { route } = require('./user');
const blog = require('./Blog/blog') ;
const comment = require('./Comments')
    
 
routes.get('/blog',blogController.getBlogs)
routes.use('/user',user) 
routes.use('/Blog',blog) 
routes.use('/comments',comment) 
routes.post('/UserData',usercontroller.UserData)
routes.get('/google-registration',passport.authenticate('google', { scope : ['profile','email']},usercontroller.createsession))
routes.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/login'}),usercontroller.createsession)
routes.post('/createsession',passport.authenticate('local',{ failureRedirect : '/user/login'  }),usercontroller.createsession)
routes.get('/', passport.checkAuthentication , usercontroller.blog)
routes.get('/layout', passport.checkAuthentication , usercontroller.layout)
routes.get('/logout',usercontroller.logout )  
routes.get('/Creat',passport.checkAuthentication,blogController.getblogpage)

   
module.exports = routes;      