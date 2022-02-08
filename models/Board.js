const mongoose = require('mongoose')
module.exports = mongoose.model('Board', new mongoose.Schema({
	name: String,
	about: String,
	icon: String,
	banner: String,
	created: Date,
	creator: String,
}))