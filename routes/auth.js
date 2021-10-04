// import express from 'express'

const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc Auth with Google
// @route GET /auth/google
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile'] })
)

// @desc Google auth callback
// @route GET /auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate(
        'google',                       //strategy
        { failureRedirect: '/' }        // where to go on failed authentication
    ),

    (req, res) => { res.redirect('/dashboard') }       // where to go on successfull authentication
)

// @desc Logout user
// @route GET /auth/logout
// with the passport middleware, once we login -> we'll have logout method on request object
router.get('/logout',(req,res) => {
    req.logout()
    res.redirect('/')
})
// export default router
module.exports = router
