const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const connectDb = require('./config/db')
dotenv.config({
    path: './config/config.env'
})

connectDb()

const app = express()

if(process.env.NODE_ENV == 'developement'){
    app.use(morgan('dev'))
}

// passport
require('./config/passport')(passport)

//handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')

//session
app.use(session({
    secret: 'boring',
    resave: false,
    saveUninitialized: true,
    cookie: {secure : true}
}))
//passport middleware
app.use(passport.initialize())
app.use(passport.session())
//static
app.use(express.static(path.join(__dirname, 'public')))

//Router
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running of ${process.env.NODE_ENV}mode on ${PORT}`))