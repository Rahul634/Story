const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

router.get('/dashboard', (req, res) => {
    res.render('Dashboard')
})

module.exports = router