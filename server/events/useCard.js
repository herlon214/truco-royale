// Libs
const debug = require('debug')('truco-royale:events')
const getGameBasedOnPlayer = require('../lib/getGameBasedOnPlayer')

module.exports = (context, socket, data, callback) => {
  try {
    const game = getGameBasedOnPlayer(context.games, socket.id)
    const round = game.rounds.get(game.actualRoundIndex)

    round.useCard(socket.id, data)
    if (round.finished) {
      game.parseResults()
    }
    context.io.to(game.getRoom()).emit('refreshGame', game)
  } catch (err) {
    console.log(err)
    socket.emit('error', 'Ocorreu um erro')
  }
}
