const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')

const {URL} = require('./models/url')

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')
require('dotenv').config()

const {connectMongoDB} = require('./connection')
const { isUserLoggedIn, checkAuth } = require('./middlewares/auth')

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const app = express();

connectMongoDB(MONGO_URI)

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

app.use('/', checkAuth, staticRoute)

app.use('/url', isUserLoggedIn, urlRoute)

app.use('/user', userRoute)

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))