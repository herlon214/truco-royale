// Get the following card of the given one
const nextCard = (givenCard) => {
  switch (givenCard) {
    case '4': return '5'
    case '5': return '6'
    case '6': return '7'
    case '7': return 'Q'
    case 'Q': return 'J'
    case 'J': return 'K'
    case 'K': return 'A'
    case 'A': return '2'
    case '2': return '3'
    case '3': return '4'
  }
}

// Convert cards to numbers to see whats the best
const cardToNumber = (givenCard, pivot) => {
  const card = givenCard.split('_')[0]
  const symbol = givenCard.split('_')[1]

  let points

  // Set points to the cards
  switch (card) {
    case 'X': points = -1; break
    case '4': points = 0; break
    case '5': points = 1; break
    case '6': points = 2; break
    case '7': points = 3; break
    case 'Q': points = 4; break
    case 'J': points = 5; break
    case 'K': points = 6; break
    case 'A': points = 7; break
    case '2': points = 8; break
    case '3': points = 9; break
  }

  // Multiply by the symbol if pivot
  if (nextCard(pivot.split('_')[0]) === card) {
    switch (symbol) {
      case 'A': points *= 10; break
      case 'B': points *= 20; break
      case 'C': points *= 30; break
      case 'D': points *= 40; break
    }
  }

  return points
}

// Return the best card of the given cards
module.exports = (cards, pivot) => {
  let higher = cards.get(0)

  // Check if there are different cards
  const differentCards = cards.map((card) => card.split('_')[0]).filter((card) => card !== higher.split('_')[0])

  // If there are no different card and the cards aren't pivot
  if (differentCards.size === 0 && higher.split('_')[0] !== nextCard(pivot.split('_')[0])) {
    return 'X'
  }

  cards.forEach((card) => {
    const points = cardToNumber(card, pivot)

    if (points > cardToNumber(higher, pivot)) {
      higher = card
    }
  })

  return higher
}
