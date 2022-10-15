
const User = require('../models/User')

module.exports.auth = async (req,res,next) => {
    if(req?.cookies?.user && req?.cookies?.user?._id){
        const data = await User.findById(req.cookies.user._id)
        if(data){
            next()
        }
    }
    else {
        res.redirect('/user/login')
    }
} 