// Libs
const debug = require('debug')('truco-royale:events')
const getGameBasedOnPlayer = require('../lib/getGameBasedOnPlayer')

module.exports = (context, socket, data, callback) => {
  try {
    const game = getGameBasedOnPlayer(context.games, socket.id)
    const room = game.getRoom()

    game.createRound()

    // Update the game
    context.io.to(room).emit('refreshGame', game)
  } catch (err) {
    console.log(err)
    socket.emit('error', 'Ocorreu um erro ao prever')
  }
}
