// Return card with symbols
const createSymbols = (card) => {
  return ['A', 'B', 'C', 'D'].map((symbol) => card + '_' + symbol)
}

class Game {
  constructor () {
    // Set the game cards
    this.cards = ['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3']
      .map(createSymbols)
      .reduce((acc, cards) => acc.concat(cards), [])
  }
}

module.exports = Game
