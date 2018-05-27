// Libs
const express = require('express')
const app = express()
const path = require('path')
const http = require('http').Server(app)
const socketio = require('socket.io')(http)
const io = require('./server/socket')
const debug = require('debug')('truco-royale:server')

// Variables
const port = process.env.PORT || 5000

async function main () {
  try {
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, 'dist')))

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'))
    })

    io(socketio)

    http.listen(port)
    debug(`Truco Royale listening on ${port}`)
  } catch (err) {
    debug(err)
  }
}

main()
