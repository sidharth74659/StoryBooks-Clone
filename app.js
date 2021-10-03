// // when mentioning "type": "module" in package.json, you can use 'import' syntax
// import express from 'express'
// import dotenv from 'dotenv'
// // import { config } from 'dotenv'
// import connectDB from './config/db.js'
// import morgan from 'morgan'
// import exphbs from 'express-handlebars'

// without mentioning "type": "module" in package.json
const path = require('path')                //in-built module - used to access dirname
const express = require('express')          //framework to create and handle routes and server
const dotenv = require('dotenv')            //hide secret_keys like API_KEY, MONGO_URI, PORT
const morgan = require('morgan')            //to observe ongoing requests, response time, status
const exphbs = require('express-handlebars')//template engine for dynamic content
const session = require('express-session')
const passport = require('passport')
const connectDB = require('./config/db')    //to connect to mongoDB
const { request } = require('http')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)


//connectDB
connectDB()

// Logging (as in printing)
const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

// Passport middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())



// Static folder
app.use(express.static(path.join(__dirname, 'public')))


// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

// PORT
const PORT = process.env.PORT || 3000

// listen to PORT
app.listen(
    PORT,
    () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)