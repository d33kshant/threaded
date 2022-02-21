const User = require('../models/User')

const getUser = async (req, res) => {
	const { username } = req.query
	const _username = req.user?.username
	if (!username) {
		return res.json({
			error: "Username is required."
		})
	}

	try {
		const user = await User.findOne({ username }, { password: 0, __v: 0, boards: 0 })
		const _user = await User.findOne({ username: _username })

		if (!user) {
			return res.json({
				error: "User not found."
			})
		}

		const followers = await User.find({ follow: { $all: [username] } }).count()
		const following = user.follow.length

		var isFollower = false, inFollowing = false
		if (_user) {
			inFollowing = _user.follow.filter(person=>person===username) >= 0
			isFollower = user.follow.filter(person=>person===_username) >= 0
		}

		delete user._doc.follow
		res.json({ ...user._doc, followers, following, isFollower, inFollowing})

	} catch (error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const followUser = async (req, res) => {
	const { username } = req.body
	const { username: _username } = req.user
	
	if(username === _username) {
		return res.json({
			error: "You can't follow yourself."
		})
	}

	try {
		const user = await User.findOne({ username })
		const _user = await User.findOne({ username: _username })

		if (user) {
			return res.json({
				error: "User not found."
			})
		}
		
		if (_user.follow.indexOf(user.username) !== -1) {
			_user.follow = _user.follow.filter(person=>person!==user.username)
			_user.save((error, _) => {
				if (error) {
					res.json({
						error: "Something went wrong."
					})
				} else {
					res.json({
						following: false,
						message: `Unfollowed ${user.username}`
					})
				}
			})
		} else {
			_user.follow.push(user.username)
			_user.save((error, _) => {
				if (error) {
					res.json({
						error: "Something went wrong."
					})
				} else {
					res.json({
						following: true,
						message: `Started following ${user.username}`
					})
				}
			})
		}

	} catch (error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

module.exports = { getUser, followUser }