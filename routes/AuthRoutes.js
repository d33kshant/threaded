const router = require('express').Router()

router.get('/login', (req, res, next) => {
	const { username, passowrd } = req.body
	res.json({
		username,
		passowrd
	})
	next()
})

router.get('/signup', (req, res, next) => {
	const { username, email, passowrd } = req.body
	res.json({
		username,
		email,
		passowrd
	})
	next()
})

module.exports = router