const mongoose = require('mongoose')
export default mongoose.model('Post', new mongoose.Schema({
	body: String,
	time: Date,
	author: String,
	ref: String,
	board: String,
	tags: [String]
}))