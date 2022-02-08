const mongoose = require('mongoose')
module.exports = mongoose.model('User', new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	avatar: String,
	bio: String,
	joined: Date,
	follow: [String],
	boards: [String],
}))