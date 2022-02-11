const router = require('express').Router()
const { getPost, getPosts, createPost, likePost } = require('../controllers/PostController')
const { authenticate, authorize } = require('../controllers/AuthController')

router.post('/create', authenticate, createPost)
router.post('/like', authenticate, likePost)
router.get('/:id', authorize, getPost)
router.get('/', authorize, getPosts)

module.exports = router