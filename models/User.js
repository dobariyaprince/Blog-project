const mongoose = require('mongoose')
const db = require('../config/db')

const UserSchema = mongoose.Schema(
    {
        firstName : {
            type : String
        },
        lastName : {
            type : String
        },
        email : {
            type : String,
            unique : true
        },
        password : { 
            type : String, 
        },
    }
)


const User = mongoose.model('User' , UserSchema)
module.exports = User
