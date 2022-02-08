const mongoose = require('mongoose')
export default mongoose.model('Board', new mongoose.Schema({
	name: String,
	about: String,
	icon: String,
	banner: String,
	created: Date,
	creator: String,
}))