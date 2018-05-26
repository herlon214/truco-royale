// Libs
const { Map, List } = require('immutable')
const Round = require('./round')
const createSymbols = require('../lib/createSymbols')

class Game {
  constructor () {
    this.players = List()
    this.rounds = List()
    this.started = false
    this.startedAt = null

    // Set default values
    this.defaultPlayerLife = 4
    this.defaultShuffleTimes = 10
    this.cards = List(['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3'])
      .map(createSymbols)
      .reduce((acc, cards) => acc.concat(cards), List())
  }

  // Insert a player into the match
  newPlayer (player) {
    // Do not let a player enter if it has already started
    if (this.started) return

    this.players = this.players.push(
      Map(player).merge({
        life: this.defaultPlayerLife
      })
    )
  }

  // Start the match
  start () {
    this.started = true
    this.startedAt = new Date()
  }

  // Create a new round
  createRound () {
    if (this.players.size === 0) throw new Error('There is no players')

    const round = new Round({
      number: this.rounds.size + 1,
      cards: this.shuffleCards(),
      players: this.players.slice()
    })

    this.rounds = this.rounds.push(round)
  }

  // Shuffle given cards
  shuffleCards (cards, times) {
    if (!cards) cards = this.cards
    if (!times) times = this.defaultShuffleTimes

    if (times === 1) return cards.sort(() => 0.5 - Math.random())

    return this.shuffleCards(cards.sort(() => 0.5 - Math.random()), times - 1)
  }
}

module.exports = Game
