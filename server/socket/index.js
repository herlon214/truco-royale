// Libs
const debug = require('debug')('truco-royale:socket')
const events = require('../events')
let games = []
let sockets = []

module.exports = (io) => {
  // New socket client has joined
  io.on('connection', (socket) => {
    // Bind the events to client
    Object.keys(events).map((evt) => {
      debug(`Registering event [${evt}] to ${socket.id}`)
      const middleware = (data, callback) => {
        events[evt]({ games, sockets, io }, socket, data, callback)
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

      // Remove player from a connected game
      games = games.map((game) => {
        // Check if the player leaved this game
        const actualPlayersNumber = game.players.size
        game.players = game.players.filter((player) => player.get('playerId') !== socket.id)
        const newPlayersNumber = game.players.size

        if (actualPlayersNumber !== newPlayersNumber) {
          io.to(game.getRoom()).emit('refreshGame', game)
        }

        return game
      })
    })
  })

  return io
}
