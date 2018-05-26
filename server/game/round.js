// Libs
const { List } = require('immutable')

// Round
class Round {
  constructor ({ number, cards, players }) {
    this.number = number

    // Parse the players
    this.players = players.map((player) => {
      return player.merge({
        cards: List()
      })
    })

    // Set the first card as pivot
    this.pivot = cards.get(0)

    cards = cards.shift()

    // Check the maximum cards for players
    const slice = Math.min(Math.round(cards.size / players.size), number * players.size)
    cards = cards.slice(0, slice)

    // Give the cards to the players
    let index = 0
    while (cards.size > 0) {
      if (index >= this.players.size) index = 0
      
      // Set a new List of cards to the player
      let player = this.players.get(index)
      player = player.set('cards', player.get('cards').push(cards.get(0)))

      this.players = this.players.set(index, player)
      cards = cards.shift()
      index++
    }
  }
}

module.exports = Round
