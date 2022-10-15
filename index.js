require('dotenv').config()
const express = require('express')
const app = express()
const BodyParser = require('body-parser')
const db = require ('./config/db')
const Blog = require ( './models/blog')
const User = require ( './models/User')
const routes = require('./routes')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const bcrypt = require('bcrypt');
const flashhandler = require('./middlewars/fashMessag')
const flash = require('connect-flash');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const passport = require ('passport')
const { auth } = require('./middlewars/authenrtication')
const GoogleStrategy = require('./controller/passpost-google')
const LocalStrategy = require('./controller/passpost-local')


db.mongoose.connect(db.url).then(() => {
    console.log("DB Connceted"); 
}).catch((Error) => {
    console.log('Error' , Error);
})


app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',    
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false , maxAge : 10000 }
  }))

 
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)

app.use(BodyParser())
app.use(express.static("public"))
app.set('view engine' , 'ejs')
app.use(flash())
app.use(flashhandler.flashhandler)

app.get('/Home' , (req , res) => {
    res.render('Home.ejs')
})

app.use(routes);

app.listen(process.env.PORT , () => {
    console.log("Server Connected");
}) 