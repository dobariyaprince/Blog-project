const passport = require ('passport')
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const User = require ('../models/User')


passport.use(new GoogleStrategy({
    clientID: "880493935122-52it073potkk6ff7232ictpa796b7e7b.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:2001/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ email : profile._json.email }, async (err, user) => {
      if(err){
        done(err)
      }
      if(user){
        done(null , user);
      }
      else{
        const newUser = await User.create({
          firstName : profile._json.family_name,
          lastName : profile._json.given_name,
          email : profile._json.email,
          password : "123456"
        })
        done(null , newUser)
        
        console.log('profile++',newUser);
      }
    });
  }
));