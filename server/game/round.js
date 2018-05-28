// Libs
const { Map, List } = require('immutable')
const extractBestCard = require('../lib/extractBestCard')

// Round
class Round {
  constructor ({ number, cards, players }) {
    this.number = number
    this.finished = false
    this.actualDuelIndex = 0
    this.decisionIndex = 0
    this.decisionId = players.get(this.decisionIndex).get('playerId')
    this.duels = List()
    this.predicts = List()

    // Create the cards list for each duel
    for (let i = 1; i <= number; i++) {
      this.duels = this.duels.push(Map({
        cards: List()
      }))
    }

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

  // Update the decision time
  updateDecision () {
    // Reset decision time
    if (this.decisionIndex === this.players.size - 1) {
      this.decisionIndex = 0
    } else {
      this.decisionIndex += 1
    }

    this.decisionId = this.players.get(this.decisionIndex).get('playerId')
  }

  // Set the player predicts
  setPredict (playerId, wins) {
    if (this.decisionId !== playerId) return

    this.predicts = this.predicts.push(Map({ playerId, wins }))
    this.updateDecision()
  }

  // Set the player duel card
  useCard (playerId, card) {
    // Set the duel cards
    let duel = this.duels.get(this.actualDuelIndex)
    const newCards = duel.get('cards').push(Map({ playerId, card }))
    duel = duel.set('cards', newCards)

    this.duels = this.duels.set(this.actualDuelIndex, duel)

    // Remove the card from the player
    this.players = this.players.map((player) => {
      if (player.get('playerId') === playerId) {
        player = player.set('cards', player.get('cards').filter((c) => c !== card))
      }

      return player
    })

    this.updateDecision()

    // Check if need to set next duel
    if (this.duels.get(this.actualDuelIndex).get('cards').size === this.players.size) {
      this.actualDuelIndex += 1
    }

    // Check if there are cards to be used
    let cardsLeft = 0
    this.players.forEach((player) => {
      cardsLeft += player.get('cards').size
    })

    // Finish the round if there are no cards left
    if (cardsLeft === 0) this.finish()
  }

  // Finish the round
  finish () {
    this.finished = true
    this.actualDuelIndex += 1
  }

  // Return the players discounting prediction errors
  getResults () {
    // Count the wins of each player
    const winsOfEachPlayer = this.duels.reduce((acc, duel) => {
      const cards = duel.get('cards').map((item) => item.get('card'))
      console.log(cards)
      const bestCard = extractBestCard(cards, this.pivot)

      // Check if the duel has folded
      if (bestCard === 'X') return acc

      // Get the player that won the duel
      const winnerId = duel.get('cards').filter((item) => item.get('card') === bestCard).get(0).get('playerId')

      // Increment his wins
      let playerWonsTotal = acc.get(winnerId) || 0
      acc = acc.set(winnerId, playerWonsTotal + 1)

      // Get the players that won't win the duel
      const losers = duel.get('cards').filter((item) => item.get('card') !== bestCard)
      losers.forEach((loser) => {
        playerWonsTotal = acc.get(loser.get('playerId')) || 0
        acc = acc.set(loser.get('playerId'), playerWonsTotal)
      })

      return acc
    }, Map())

    return winsOfEachPlayer
  }
}

module.exports = Round
