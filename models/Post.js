const mongoose = require('mongoose')
module.exports = mongoose.model('Post', new mongoose.Schema({
	body: String,
	time: Date,
	author: String,
	ref: String,
	board: String,
	likes: [String],
	replies: [String]
}))