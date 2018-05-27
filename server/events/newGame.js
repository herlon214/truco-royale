// Libs
const Game = require('../game')
const GenerateId = require('generate-id')
const guid = new GenerateId()

module.exports = (context, socket, data, callback) => {
  const game = new Game(guid.generate(3))

  game.newPlayer({ playerId: socket.id, name: 'Test', role: ['admin'] })
  context.games.push(game)

  callback(game.id)
}
