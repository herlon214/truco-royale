// Libs
const Game = require('../game')
const GenerateId = require('generate-id')
const guid = new GenerateId()

module.exports = (context, socket, data, callback) => {
  const game = new Game(guid.generate(3))

  context.games.push(game)

  callback(game.id)
}
