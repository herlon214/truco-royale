// Libs
const { List } = require('immutable')
const { expect } = require('chai')
const extractBestCard = require('../lib/extractBestCard')

describe ('Extract best card test', () => {
  it ('should return A_A when given A_A, 2_B, 3_D and pivot K_A', () => {
    const cards = List(['A_A', '2_B', '3_D'])
    const pivot = 'K_A'

    expect(extractBestCard(cards, pivot)).to.be.eq('A_A')
  })

  it ('should return X when given A_A, A_B, A_C and pivot 3_A', () => {
    const cards = List(['A_A', 'A_B', 'A_C'])
    const pivot = '3_A'

    expect(extractBestCard(cards, pivot)).to.be.eq('X')
  })

  it ('should return X when given A_A, A_B, A_C and pivot K_A', () => {
    const cards = List(['A_A', 'A_B', 'A_C'])
    const pivot = 'K_A'

    expect(extractBestCard(cards, pivot)).to.be.eq('A_C')
  })
})
