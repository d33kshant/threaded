const router = require('express').Router()
const { getPost, getPosts, createPost } = require('../controllers/PostController')
const { verify } = require('../controllers/AuthController')

router.get('/:id', getPost)

router.get('/', getPosts)

router.post('/create', verify, createPost)

module.exports = router