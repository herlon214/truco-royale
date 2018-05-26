// Libs
const express = require('express')
const app = express()
const path = require('path')
const server = require('http').Server(app)
const socket = require('./server')

// Variables
const port = process.env.PORT || 5000

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join('/dist/index.html'))
})

// Bind server app
socket(server)
app.listen(port)
console.log(`Truco Royale listening on ${port}`)
