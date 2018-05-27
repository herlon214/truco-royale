// Libs
const { Map, List } = require('immutable')
const Round = require('./round')
const createSymbols = require('../lib/createSymbols')

class Game {
  constructor (id) {
    this.id = id
    this.players = List()
    this.rounds = List()
    this.started = false
    this.startedAt = null
    this.actualRoundIndex = -1

    // Set default values
    this.defaultPlayerLife = 4
    this.defaultShuffleTimes = 10
    this.cards = List(['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3'])
      .map(createSymbols)
      .reduce((acc, cards) => acc.concat(cards), List())
  }

  getRoom () {
    return 'game_' + this.id
  }

  // Insert a player into the match
  newPlayer (player) {
    // Do not let a player enter if it has already started
    if (this.started) return

    this.players = this.players.push(
      Map(player).merge({
        lifes: this.defaultPlayerLife
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
      players: this.players
    })

    this.rounds = this.rounds.push(round)
    this.actualRoundIndex += 1
  }

  // Finish the actual round
  finishRound () {
    let round = this.rounds.get(this.actualRoundIndex)
    round.finish()

    const results = round.getResults()
    let predictsDifference = Map()

    // Calculate the difference between predicts and wins
    round.predicts.forEach((predict) => {
      const diff = Math.abs(predict.get('wins') - results.get(predict.get('playerId')))
      predictsDifference = predictsDifference.set(predict.get('playerId'), diff)
    })

    // Remove the lives of those who did a prediction mistake
    this.players = this.players.map((player) => {
      const diff = player.get('lifes') - predictsDifference.get(player.get('id'))
      return player.set('lifes', diff)
    })

    this.rounds = this.rounds.set(this.actualRoundIndex, round)
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
