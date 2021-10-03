// import express from 'express'

const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc Auth with Google
// @route GET /auth/google
router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }))

// @desc Google auth callback
// @route GET /auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate(
        'google',                       //strategy
        { failureRedirect: '/' }        // where to go on failed authentication
    ),

    (req, res) => {res.redirect('/dashboard') }       // where to go on successfull authentication
)

// export default router
module.exports = router
