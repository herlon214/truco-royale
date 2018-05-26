// Libs
const { List } = require('immutable')

// Return card with symbols
module.exports = (card) => {
  return List(['A', 'B', 'C', 'D']).map((symbol) => card + '_' + symbol)
}
