const express = require('express')
const path = require('path')
const server = require('./server')

const app = express()
const port = process.env.PORT || 5000

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join('/dist/index.html'))
})

// Bind server app
server(app)

app.listen(port)

console.log(`Truco Royale listening on ${port}`)
