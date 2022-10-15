const { application } = require('express')
const express = require('express')
const passport = require('passport')
const routes = express.Router()
const blogController = require('../../controller/blogController')

routes.post('/CreatData' ,passport.checkAuthentication, blogController.CreatBlog)
routes.get('/Delete/:id', blogController.DeleteBlog)


module.exports = routes; 
  