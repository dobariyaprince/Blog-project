const mongoose = require('mongoose');
const Blog = require('./blog');

const CommentSchema = mongoose.Schema({
    content : {
        type : String,
        default : 'test'
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User' 
    },
    blog_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'blog'
    }
}, { 
    timestamps : true
})

const Comment = mongoose.model('Comment',CommentSchema);
module.exports = Comment