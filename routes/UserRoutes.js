const { authorize } = require('../controllers/AuthController')
const { getUser } = require('../controllers/UserController')
const router = require('express').Router()

router.get('/', authorize, getUser)
module.exports = router