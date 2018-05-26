const { List } = require('immutable')
const { expect } = require('chai')
const extractBestCard = require('../lib/extractBestCard')
const Game = require('../game')

describe ('Round test', () => {
  it ('should create the a rounds with correct number of cards', () => {
    const game = new Game()

    const admin = { id: '123', name: 'Herlon Aguiar', role: ['admin'] }
    const player = { id: '456', name: 'Jeovano Coutinho', role: ['player'] }

    game.newPlayer(admin)
    game.newPlayer(player)
    game.start()
    game.createRound()

    // First round test
    expect(game.rounds.size).to.be.eq(1)
    expect(game.rounds.get(0)).to.have.keys([ 'number', 'pivot', 'players', 'duels', 'actualDuelIndex', 'finished', 'predicts' ])
    expect(game.rounds.get(0).players.size).to.be.eq(2)
    expect(game.rounds.get(0).players.getIn([0, 'cards']).size).to.be.eq(1)
    expect(game.rounds.get(0).players.getIn([0, 'cards']).size + game.rounds.get(0).players.getIn([1, 'cards']).size).to.be.eq(2)

    game.createRound()

    // Second round test
    expect(game.rounds.size).to.be.eq(2)
    expect(game.rounds.get(1)).to.have.keys([ 'number', 'pivot', 'players', 'duels', 'actualDuelIndex', 'finished', 'predicts' ])
    expect(game.rounds.get(1).players.size).to.be.eq(2)
    expect(game.rounds.get(1).players.getIn([0, 'cards']).size).to.be.eq(2)
    expect(game.rounds.get(1).players.getIn([0, 'cards']).size + game.rounds.get(1).players.getIn([1, 'cards']).size).to.be.eq(4)
  })

  it ('should execute a duel', () => {
    const game = new Game()
    const admin = { id: '123', name: 'Herlon Aguiar', role: ['admin'] }
    const player = { id: '456', name: 'Jeovano Coutinho', role: ['player'] }

    game.newPlayer(admin)
    game.newPlayer(player)
    game.start()
    game.createRound()

    const round = game.rounds.get(game.actualRoundIndex)

    // Confirm the number of duels in the round
    expect(round.duels.size).to.be.eq(1)

    // Check all the cards in the round
    let cards = round.players
      .map((player) => player.get('cards'))
      .reduce((acc, cards) => acc.concat(cards), List())

    // Get the best card in the round
    const bestCard = extractBestCard(cards, round.pivot)

    // Check if the round won't fold
    if (bestCard !== 'X') {
      // Check from whose is the best card
      const bestPlayer = round.players.filter((player) => {
        return player.get('cards').indexOf(bestCard) >= 0
      }).get(0)
      const worstPlayer = round.players.filter((player) => {
        return player.get('cards').indexOf(bestCard) < 0
      }).get(0)

      // Predict that the best player will win
      round.setPredict(bestPlayer.get('id'), 1)
      round.setPredict(worstPlayer.get('id'), 1)

      // Try to get the round results without finished
      expect(round.getResults.bind(round)).to.throw(`The round doesn't finished yet`)

      // Use cards
      round.useCard(bestPlayer.get('id'), bestPlayer.getIn(['cards', 0]))
      round.useCard(worstPlayer.get('id'), worstPlayer.getIn(['cards', 0]))

      // Finish the round
      game.finishRound()

      // Check if the worstPlayer lost a life
      const worstPlayerUpdated = game.players.filter((player) => player.get('id') === worstPlayer.get('id')).get(0)
      expect(worstPlayerUpdated.get('lifes')).to.be.eq(3)
    } else {
      // Predict that the game will fold
      game.rounds.get(0).setPredict(admin.id, 0)
      game.rounds.get(0).setPredict(player.id, 0)

      // Finish the round
      game.finishRound()

      game.players.forEach((player) => [
        expect(player.get('lifes')).to.be.eq(game.defaultPlayerLife)
      ])
    }

  })
})
