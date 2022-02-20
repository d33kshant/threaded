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

const followUser = (req, res) => {
	const { username } = req.body
	const { username: _username } = req.user
	res.json(username)
}

module.exports = { getUser, followUser }