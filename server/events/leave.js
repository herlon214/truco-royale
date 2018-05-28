// Libs
const debug = require('debug')('truco-royale:events')

module.exports = (context, socket, data, callback) => {
  try {
    const game = context.games.filter((game) => game.id === data)[0]
    game.players = game.players.filter((player) => player.get('playerId') !== socket.id)
    if (!game) return

    // Leave game room
    socket.leave(game.getRoom())

    context.io.to(game.getRoom()).emit('message', 'Um jogador saiu da partida...')
    context.io.to(game.getRoom()).emit('refreshGame', game)

    debug(`Player ${socket.id} has leaved game ${game.id}`)
  } catch (err) {
    console.log(err)
    socket.emit('error', 'Ocorreu um erro')
  }
}
