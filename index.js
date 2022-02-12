require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const authRoute = require('./routes/AuthRoutes')
const postRoute = require('./routes/PostRoutes')
const boardRoute = require('./routes/BoardRoutes')

const PORT = process.env.PORT || 5000
const DB_URI = process.env.DB_URI

const app = express()
app.use(express.json())
app.use(require('cookie-parser')())

app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)
app.use('/api/board', boardRoute)

mongoose.connect(DB_URI, (error) => {
	if (error) return console.log("Can't connect to database.")
	console.log('Connected to database.')
	app.listen(PORT, () => console.log('Sever listening on port:', PORT))
})