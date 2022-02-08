require('dotenv').config()
const express = require('express')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(PORT, () => console.log('Sever listening on port:', PORT))