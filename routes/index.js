// import express from 'express'

const express = require('express')
const router = express.Router()

// @desc Login/Landing Page
// @route GET /
router.get('/', (req, res) => {
    // res.render(file_name_to_render)
    res.render(
        'login',                //default_dir : views/
        { layout: 'login' }     //default_dir : views/layouts/
    )
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

// export default router
module.exports = router
