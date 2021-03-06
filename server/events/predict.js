// Libs
const debug = require('debug')('truco-royale:events')
const getGameBasedOnPlayer = require('../lib/getGameBasedOnPlayer')

module.exports = (context, socket, data, callback) => {
  try {
    const game = getGameBasedOnPlayer(context.games, socket.id)
    const round = game.rounds.get(game.actualRoundIndex)
    const room = game.getRoom()

    round.setPredict(socket.id, data)
    socket.emit('message', 'Toque na carta para usar quando estiver disponível.')

    // Update the game
    context.io.to(room).emit('refreshGame', game)
  } catch (err) {
    console.log(err)
    socket.emit('error', 'Ocorreu um erro ao prever')
  }
}
