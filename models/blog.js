const mongoose = require('mongoose')
const db = require('../config/db')

const UserSchema = mongoose.Schema(
    {
        Hedding : {
            type : String,
            default : 'Hello Wold'
       },
        SubHedding : {
            type : String,
            default : 'Sub hadding'
        },
        Url : {
            type : String,
            default : 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80'
        },
        user_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        comments : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment',
            default : []
        }]  

    } ,{
        timestamps : true
    })

const Blog = mongoose.model('Blog' , UserSchema)
module.exports = Blog