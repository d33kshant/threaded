const router = require('express').Router()
const { createBoard, getBoard, joinBoard } = require('../controllers/BoardController')
const { authenticate, authorize } = require('../controllers/AuthController')

router.post('/create', authenticate, createBoard)
router.post('/join', authenticate, joinBoard)
router.get('/:name', authorize, getBoard)

module.exports = router