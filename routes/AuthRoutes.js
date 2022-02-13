const router = require('express').Router()
const { login, signup, verify } = require('../controllers/AuthController')

router.get('/verify', verify)
router.post('/signup', signup)
router.post('/login', login)

module.exports = router