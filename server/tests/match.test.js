const { Map } = require('immutable')
const { expect } = require('chai')
const Game = require('../game')

describe ('Match test', () => {
  it ('should join a player to the game', () => {
    const game = new Game()
    const player = { id: '123', name: 'Herlon Aguiar', role: ['admin'] }

    game.newPlayer(player)

    expect(game.players.size).to.be.eq(1)
    expect(game.players.get(0).toJS()).to.be.deep.equal({
      id: player.id,
      name: player.name,
      role: player.role,
      lifes: game.defaultPlayerLife
    })
  })

  it ('should not let a player enter the game if it started', () => {
    const game = new Game()

    const admin = { id: '123', name: 'Herlon Aguiar', role: ['admin'] }
    const player = { id: '456', name: 'Jeovano Coutinho', role: ['player'] }

    game.newPlayer(admin)
    game.start()
    game.newPlayer(player)

    expect(game.players.size).to.be.eq(1)
    expect(game.players.get(0).toJS()).to.be.deep.equal({
      id: admin.id,
      name: admin.name,
      role: admin.role,
      lifes: game.defaultPlayerLife
    })
  })

  it ('should not create a round if there is no players', () => {
    const game = new Game()

    expect(game.createRound.bind(game)).to.throw('There is no players')
  })
})
