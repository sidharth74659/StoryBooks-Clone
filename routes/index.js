// import express from 'express'

const express = require('express')
const router = express.Router()

// @desc Login/Landing Page
// @route GET /
router.get('/', (req, res) => {
    // res.render(file_to_render)
    res.render(
        'login',                //default_dir : views/
        { layout: 'login' }     //By default the layout goes to main(since that's what we mentioned in app.js)...so we change it to views/layouts/login.hbs
    )
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard')     //By default the layout goes to main(since that's what we mentioned in app.js)
})

// export default router
module.exports = router


/*
google cloud console -> 
    -> Create a project
    -> API and Services -> Enable API's and services
                        -> API Library -> Google+ API -> ENABLE
                        -> Credentials -> CREATE CREDENTIALS > OAuth client ID
                        -> Authorized redirect URIs > 'http://localhost:3000/auth/google/callback' -> CREATE -> COPY CLIENT_ID and CLIENT_SECRET
                        


*/