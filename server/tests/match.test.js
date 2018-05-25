const { expect } = require('chai')
const game = require('../game')

describe ('Matching test', () => {
  it ('should create a new match', () => {
    const match = game.createMatch()

    expect(match.players).to.have.lengthOf(0)
    expect(match.rounds).to.have.lengthOf(0)
    expect(match.started).to.be.false()
  })

  it ('should join a player to the match', () => {
    const match = game.createMatch()
    const player = { id: '123', name: 'Herlon Aguiar', role: ['admin'] }

    match.newPlayer(player)

    expect(match.players).to.have.lengthOf(1)
    expect(match.players[0]).to.be.equal({
      id: player.id,
      name: player.name,
      role: player.role,
      life: match.defaultPlayerLife
    })
  })

  it ('should not let a player enter the match if it started', () => {
    const match = game.createMatch()
    const admin = { id: '123', name: 'Herlon Aguiar', role: ['admin'] }
    const player = { id: '456', name: 'Jeovano Coutinho', role: ['player'] }

    match.newPlayer(admin)
    match.start()
    match.newPlayer(player)

    expect(match.players).to.have.lengthOf(1)
    expect(match.players[0]).to.be.equal(admin)
  })

  it ('should create the a round', () => {
    const match = game.createMatch()
    const admin = { id: '123', name: 'Herlon Aguiar', role: ['admin'] }
    const player = { id: '456', name: 'Jeovano Coutinho', role: ['player'] }

    match.newPlayer(admin)
    match.newPlayer(player)
    match.start()
    match.createRound()

    expect(match.rounds).to.have.lengthOf(1)
    expect(match.rounds[0]).to.have.keys([ 'pivot', 'cards', 'players' ])
    expect(match.rounds[0].players).to.have.lengthOf(2)
    expect(match.rounds[0].players[0].cards).to.have.lengthOf(1)
    expect(match.rounds[0].cards).to.have.lengthOf(2)
    expect(match.rounds[0].cards).to.have.oneOf(game.cards)
  })
})
