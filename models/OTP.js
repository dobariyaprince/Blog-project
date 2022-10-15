const mongoose = require('mongoose');

const OtpSchama = mongoose.Schema({
    otp : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    expiresIn : {
        type : Date,
        default : new Date().toISOString()
    }
}, {
    timestamps : true
})


const Otp = mongoose.model('Otp',OtpSchama);
module.exports = Otp
