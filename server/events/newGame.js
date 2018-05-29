// Libs
const debug = require('debug')('truco-royale:events')
const Game = require('../game')
const GenerateId = require('generate-id')
const guid = new GenerateId()

module.exports = (context, socket, data, callback) => {
  const id = guid.generate({ length: 3, include: ['numbers'] })
  const game = new Game(id)

  debug(`Game ${id} created!`)

  context.games.push(game)

  callback(game.id)
}
