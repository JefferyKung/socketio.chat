require('dotenv').config()
const express = require('express')
const app = express();

const cors = require('cors')
const http = require('http').Server(app)
const path = require('path')

const PORT = process.env.PORT

require('./utils/socket')(http);
app.use(cors())

app.get('/api', (_,res) => res.json({ response: "Health check"}).status(200))

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})