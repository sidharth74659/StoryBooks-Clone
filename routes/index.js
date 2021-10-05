// @ts-nocheck
// import express from 'express'

const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')

// @desc Login/Landing Page
// @route GET /

//if you tried to go to '/'  and are already logged, using the middleware:ensureGuest..redirect them to '/dashboard'
router.get('/', ensureGuest, (req, res) => {
    // res.render(file_to_render)
    res.render(
        'login',                //default_dir : views/
        { layout: 'login' }     //By default the layout goes to main(since that's what we mentioned in app.js)...so we change it to views/layouts/login.hbs
    )
})

// @desc Dashboard
// @route GET /dashboard

//if you tried to go to '/dashboard' without already logging-in, using the middleware:ensureAuth..redirect them to '/'
router.get('/dashboard', ensureAuth,async (req, res) => {
    console.log(req.user.id)
    try {
        const stories = await Story.find({user: req.user.id}).lean()
        res.render(
            'dashboard', // By default the layout goes to main(since that's what we mentioned in app.js)
            {
                name:req.user.firstName,
                stories,
            }
         ) 
    } catch (err) {
        console.log(err);
        res.render('error/500')
    }


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