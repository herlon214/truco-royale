const { Map, List } = require('immutable')
const { expect } = require('chai')
const Game = require('../game')

describe ('Game test', () => {
  it ('should have default values', () => {
    const game = new Game()

    expect(game.cards.size).to.be.eq(40)
    expect(game.players.size).to.be.eq(0)
    expect(game.rounds.size).to.be.eq(0)
    expect(game.actualRoundIndex).to.be.eq(-1)
    expect(game.started).to.be.eq(false)
  })

  it ('should have 4 symbols for each card', () => {
    const game = new Game()
    const cards = List(['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3'])

    cards.forEach((card) => {
      const thisCardWithSymbols = game.cards.filter((gameCard) => gameCard.indexOf(card + '_') >= 0)
      expect(thisCardWithSymbols.size).to.be.eq(4)
    })
  })

  it ('should have as default 4 lifes per players', () => {
    const game = new Game()
    expect(game.defaultPlayerLife).to.be.eq(4)
  })

  it ('should shuffle cards', () => {
    const game = new Game()
    const shuffle = game.shuffleCards()

    expect(shuffle.size).to.be.eq(40)
    expect(JSON.stringify(shuffle)).to.not.be.eq(JSON.stringify(game.cards)) // Raw check of cards
  })
})
