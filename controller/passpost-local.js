const passport = require ('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require ('../models/User')
const bcrypt = require ('bcrypt')


passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email,password,done){
    User.findOne({ email }, async (err,usr) => {
        if(err) {
            return  done(err)
        }
        if(!usr) {
            return done(null,false)
        }
        const data = await bcrypt.compare(password, usr.password)
        if(!data) {
            return  done(null,false)
        }
        return done(null, usr);
    })
   }
));

passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(function(id,done){
    User.findById(id,(err,user) => {
        if(err){
            done(err)
        }
        return done(null, user);
    })
})

passport.checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        next()
    }
    else {
        return res.redirect('/user/login')
    }
}

passport.setAuthenticatedUser = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}
