const router = require('express').Router()
const { createBoard, getBoard } = require('../controllers/BoardController')
const { authenticate, authorize } = require('../controllers/AuthController')

router.post('/create', authenticate, createBoard)
router.get('/:name', authorize, getBoard)

module.exports = router