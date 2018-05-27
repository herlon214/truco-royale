// Libs
const Game = require('../game')
const GenerateId = require('generate-id')

module.exports = (context, socket, data, callback) => {
  const game = context.games.filter((game) => {
    const players = game.players.filter((player) => {
      console.log(player)
      return player.get('playerId') === socket.id
    })

    return players.size > 0
  })

  socket.emit('refreshGame', game[0])
}
