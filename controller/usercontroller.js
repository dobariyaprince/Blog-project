const Blog = require ( '../models/blog')
const User = require('../models/User')
const OTP = require('../models/OTP')
const bcrypt = require('bcrypt')
const { sendOTPemail } = require('../utils/sendOTP')

module.exports.register = async (req ,res) => {
    res.render('Register.ejs')
}

module.exports.createsession = async (req , res ) => {
    req.flash('success', 'logged in successfully')
    return res.redirect('/blog')
}

module.exports.blog =  (req,res) => {
    return res.render('Login.ejs')
}

module.exports.layout =  (req,res) => {
    return res.render('layout')
}

module.exports.updateprofile = (req,res) => {
    return res.render('updateprofile.ejs',{
        id : req.user._id,
        firstName : req.user.firstName,
        lastName :  req.user.lastName,
        password :  req.user.password,
        email : req.user.email
    })
}
module.exports.updateUserprofile = async (req , res) => {
    const password = await bcrypt.hash(req.body.password,10);
    req.body.password = password
    await User.findByIdAndUpdate(req.body.id , req.body)
    req.flash('success','password Update SuccessFully')
    return res.redirect('/blog');
};


module.exports.forgetpassword = (req , res) => {
    return res.render('Forgetpassword',{
        auth : false
    }) 
} 

module.exports.sendOTP = async (req , res) => {

    const otp = Math.floor(100000 + Math.random() * 500000)
    console.log('Your Otp is ',otp)

    await sendOTPemail(req.body.email,otp)
    await OTP.create({
        otp,
        email : req.body.email,
        expiresIn : new Date(new Date().getTime() + 5 * 50000)
    })
    req.flash('success','OTP sended to youe email id')
    return res.cookie('email',req.body.email).redirect('Forgetpassword')
} 

module.exports.verifyOTP = async (req , res) => {
    
    console.log(req.body.otp);

    const UserOtp = await OTP.findOne({ otp : req.body.otp , email : req.cookies.email }).sort({ createdAt : -1 })
    console.log('UserOtp' , UserOtp);

    if(!UserOtp){
        req.flash('error','OTP Not Found')
        return res.redirect('/user/Forgetpassword')
    }
    if(new Date().getTime() > new Date(UserOtp?.expiresIn).getTime()){
        req.flash('error','Your OTP Is Expired')
        return res.redirect('/user/Forgetpassword')
    }

    const user = await User.findOne({ email : UserOtp?.email }).sort({ createdAt : -1 })
    
    req.flash('error','OTP Verified SuccessFully') 
    return res.render('Updatepassword.ejs',{
        auth : true,
        user : user._id
    })
}


module.exports.UserData = async (req, res) => {

    console.info("req.body.email+ ",req.body.email)
    const Existinguser = await User.findOne({ email : req.body.email })

    if(Existinguser){
        req.flash('error', 'Account Already Exist')
        return res.redirect('/blog');
    }
    const password = await bcrypt.hash(req.body.password , 10)
    req.body.password = password


    const Data = await User.create(req.body)
    req.flash('success' , 'You are Registered')
    return res.redirect('/blog')
}

module.exports.login = async (req ,res) => {

    if(req.isAuthenticated()){
        return res.redirect('/blog')
    }
    return res.render('Login.ejs')
}

module.exports.logout = async (req,res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/user/login');
      });
}
