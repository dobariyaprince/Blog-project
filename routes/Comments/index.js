const express = require('express');
const routes = express.Router();
const CommentController = require('../../controller/CommentController')

const passport = require('passport')
const passportLocal = require('../../controller/passpost-local');

routes.post('/createComment', CommentController.createComment) 
routes.get('/deleteComment/:id',CommentController.deleteComment)

 
module.exports = routes    