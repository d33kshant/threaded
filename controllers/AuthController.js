const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const signup = async (req, res) => {
	try {
		const { username, email, password } = req.body

		if (username && email && password) {
			const _user = await User.findOne({ username })
			const __user = await User.findOne({ email })

			if( _user || __user ) {
				res.status(400).json({
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
			res.status(400).json({
				error: "Required fields cannot be empty."
			})
		}

	} catch (error) {
		res.status(500).json({
			error: "Something went wrong, Please try again.",
			log: error
		})
	}
}

const login = async (req, res) => {
	try {
		const { username, password } = req.body
		
		if (!username || !password) {
			return res.status(400).json({
				error: "Required fields cannot be empty."
			})
		}
		
		const user = await User.findOne({ username })

		if (!user){
			res.status(404).json({
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
					delete user._doc.password
					res.clearCookie("jwt-token")
					res.cookie('jwt-token', token, { httpOnly: true }).json({
						username: user.username,
						id: user.id,
						token: token,
						avatar: user.avatar,
					})
				} else {
					res.status(500).json({
						error: "Failed to authenticate, Please try again."
					})
				}
			} else {
				res.status(404).json({
					error: "Invalid username or password."
				})	
			}
		}

	} catch (error) {
		res.status(500).json({
			error: "Something went wrong, Please try again."
		})
	}
}

const verify = (req, res) => {
	const { token } = req.query
	jwt.verify(token, process.env.SECRET, async (error, result) => {
		if (error) {
			return res.json({
				error: "Invalid auth token."
			})
		}
		const user = await User.findOne({ username: result.username }, { password: 0, __v: 0 })
		return res.json(user)
	})
}

const authenticate = (req, res, next) => {
	const token = req.cookies['jwt-token']
	if (token) {
		jwt.verify(token, process.env.SECRET, (error, user) => {
			if (error) return res.json({
				requireAuth: true,
				message: "Auth token expired or invalid, please login again."
			})
			req.user = {
				id: user.id,
				username: user.username
			}
			next()
		})
	} else {
		res.json({
			requireAuth: true,
			message: "Failed to authenticate."
		})
	}
}

const authorize = (req, res, next) => {
	const token = req.cookies['jwt-token']
	if (token) {
		jwt.verify(token, process.env.SECRET, (error, user) => {
			if(!error) {
				req.user = {
					id: user.id,
					username: user.username
				}
			}
		})
	}
	next()
}

module.exports = { login, signup, authenticate, authorize, verify }