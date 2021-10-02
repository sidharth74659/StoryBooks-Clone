// // when mentioning "type": "module" in package.json, you can use 'import' syntax
// import express from 'express'
// import dotenv from 'dotenv'
// // import { config } from 'dotenv'
// import connectDB from './config/db.js'
// import morgan from 'morgan'
// import exphbs from 'express-handlebars'

// without mentioning "type": "module" in package.json
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')

// Load config
dotenv.config({ path: './config/config.env' })


//connectDB
connectDB()

// Logging
const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')


// Static folder
app.use(express.static(path.join(__dirname, 'public')))


// Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

