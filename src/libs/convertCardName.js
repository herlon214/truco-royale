export default function (cardName) {
  const replaces = [
    ['_A', '_diamonds'],
    ['_B', '_spades'],
    ['_C', '_hearts'],
    ['_D', '_clubs'],
    ['A', 'ace'],
    ['J', 'jack'],
    ['K', 'king'],
    ['Q', 'queen'],
    ['_', '_of_']
  ]

  replaces.forEach((replace) => {
    cardName = cardName.replace(replace[0], replace[1])
  })

  return cardName
}
