require('dotenv').config()
const express = require('express')

const authRoute = require('./routes/AuthRoutes')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.use('/api/auth', authRoute)

app.listen(PORT, () => console.log('Sever listening on port:', PORT))