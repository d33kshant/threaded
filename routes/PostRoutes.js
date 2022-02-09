const router = require('express').Router()
const { getPost, getPosts, createPost } = require('../controllers/PostController')
const { authenticate, authorize } = require('../controllers/AuthController')

router.get('/:id', authorize, getPost)

router.get('/', authorize, getPosts)

router.post('/create', authenticate, createPost)

module.exports = router