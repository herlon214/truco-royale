// Libs
const debug = require('debug')('truco-royale:events')

module.exports = (context, socket, data, callback) => {
  try {
    const game = context.games.filter((game) => game.id === data)[0]

    if (!game) return

    // Join game room
    socket.join(game.getRoom())

    game.newPlayer({ playerId: socket.id, name: 'Test', role: ['admin'] })
    context.io.to(game.getRoom()).emit('refreshGame', game)

    debug(`Player ${socket.id} has joined game ${game.id}`)
  } catch (err) {
    console.log(err)
    socket.emit('error', 'Ocorreu um erro')
  }
}
