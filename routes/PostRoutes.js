const router = require('express').Router()
const { getPost, getPosts, createPost, likePost, getReplies, deletePost, getFeed } = require('../controllers/PostController')
const { authenticate, authorize } = require('../controllers/AuthController')

router.post('/create', authenticate, createPost)
router.post('/like', authenticate, likePost)
router.post('/delete', authenticate, deletePost)
router.get('/:id/replies', authorize, getReplies)
router.get('/:id', authorize, getPost)
router.get('/feed', authorize, getFeed)
router.get('/', authorize, getPosts)

module.exports = router