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
}

const login = async (req, res) => {
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
}

const verify = (req, res, next) => {
	const token = req.headers["x-access-token"]?.split(' ')[1]
	if (token) {
		jwt.verify(token, process.env.SECRET, (error, user) => {
			if (error) return res.json({
				login: false,
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
			login: false,
			message: "Failed to authenticate, please login again."
		})
	}
}

module.exports = { login, signup, verify }