const router = require('express').Router()
const { login, signup } = require('../controllers/AuthController')

router.get('/signup', signup)

router.get('/login', login)

module.exports = router