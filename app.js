// // when mentioning "type": "module" in package.json, you can use 'import' syntax
// import express from 'express'
// import dotenv from 'dotenv'
// // import { config } from 'dotenv'
// import connectDB from './config/db.js'
// import morgan from 'morgan'
// import exphbs from 'express-handlebars'

// without mentioning "type": "module" in package.json
const path = require('path')                //in-built module - used to access dirname
const morgan = require('morgan')            //to observe ongoing requests, response time, status
const dotenv = require('dotenv')            //hide secret_keys like API_KEY, MONGO_URI, PORT
const express = require('express')          //framework to create and handle routes and server
const passport = require('passport')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')//template engine for dynamic content
const session = require('express-session')
const MongoStore = require('connect-mongo') //this thing creates a " 'session' collection ' inside mongodb and thus checks every time you open the page
const connectDB = require('./config/db')    //to connect to mongoDB

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

//connectDB
connectDB()

const app = express()

// Body parser : for form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Logging (as in printing)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars Helpers
const { formatDate, truncate, stripTags, editIcon } = require('./helpers/hbs')

// Handlebars
app.engine('.hbs', exphbs({
    helpers: {
        formatDate,
        truncate,
        stripTags,
        editIcon
    }, defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Passport middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // brad-traversy uses :
    // store: new MongoStore({mongooseConnection: mongooose.connection)}
    // But it doesn't work...so here is the fix :
    // https://stackoverflow.com/questions/66654037/mongo-connect-error-with-mongo-connectsession

    // connect-mongo v4 introduces new signature(compared to v3).
    // Here is the official migration guide : https://github.com/jdesboeufs/connect-mongo/blob/HEAD/MIGRATION_V4.md#v4-migration-guide

    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))


app.use(passport.initialize())
app.use(passport.session())

// set global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})


// Static folder
app.use(express.static(path.join(__dirname, 'public')))


// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

// PORT
const PORT = process.env.PORT || 3000

// listen to PORT
app.listen(
    PORT,
    () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)