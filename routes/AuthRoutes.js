const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.get('/signup', async (req, res) => {

	try {
		const { username, email, password } = req.body

		if (username && email && password) {
			const _user = await User.findOne({ username })
			const __user = await User.findOne({ email })

			if( _user || __user ) {
				res.json({
					error: "Username or email already exist."
				})
			} else {
				const SALT = await bcrypt.genSalt()
				const hash = await bcrypt.hash(password, SALT)
				
				const user = new User({
					username,
					email,
					password: hash,
					avatar: 'avatar.png',
					bio: '',
					joined: new Date(),
					follow: [],
					boards: []
				})

				await user.save()
				res.json({
					message: "User registred, You may login now."
				})
			}
		} else {
			res.json({
				error: "Required fields cannot be empty."
			})
		}

	} catch (error) {
		res.json({
			error: "Something went wrong, Please try again.",
			log: error
		})
	}
})

router.get('/login', async (req, res) => {
	try {
		const { username, password } = req.body
		const user = await User.findOne({ username })

		if (!user){
			res.json({
				error: "Invalid username or password."
			})
		} else {
			if (await bcrypt.compare(password, user.password)) {
				const token = jwt.sign(
					{ id: user._id, username },
					process.env.SECRET,
					{ expiresIn: 86400 }
				)
				if (token) {
					res.json({
						message: "Login was successfull.",
						token: `Bearer ${token}`
					})
				} else {
					res.json({
						error: "Failed to authenticate, Please try again."
					})
				}
			} else {
				res.json({
					error: "Invalid username or password."
				})	
			}
		}

	} catch (error) {
		res.json({
			error: "Something went wrong, Please try again."
		})
	}
})

module.exports = router