const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDb = require('./config/db')
dotenv.config({
    path: './config/config.env'
})

connectDb()

const app = express()

if(process.env.NODE_ENV == 'developement'){
    app.use(morgan('dev'))
}
//handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')

//static
app.use(express.static(path.join(__dirname, 'public')))

//Router
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running of ${process.env.NODE_ENV}mode on ${PORT}`))