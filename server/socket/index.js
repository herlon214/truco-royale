// Libs
const debug = require('debug')('truco-royale:socket')
const events = require('./events')
let games = []
let sockets = []

module.exports = (io) => {
  // New socket client has joined
  io.on('connection', (socket) => {
    // Bind the events to client
    Object.keys(events).map((evt) => {
      debug(`Registering event [${evt}] to ${socket.id}`)
      const middleware = (data) => {
        events[evt]({ games, sockets }, socket, data)
      }
      socket.on(evt, middleware)
    })

    // Save the socket connection
    sockets.push(socket)

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      debug(`Socket ${socket.id} disconnected because: ${reason}`)

      // Remove from the sockets available
      sockets = sockets.filter((sock) => sock.id !== socket.id)
    })
  })

  return io
}
