const router = require('express').Router()
const { createPost } = require('../controllers/PostController')
const { verify } = require('../controllers/AuthController')

router.get('/:id', (req, res) => {
	const id = req.params.id
	res.json(id)
})

router.get('/', (req, res) => {
	res.json(req.query)
})

router.post('/', verify, createPost)

module.exports = router