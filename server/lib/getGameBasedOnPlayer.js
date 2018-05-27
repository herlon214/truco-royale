module.exports = (games, playerId) => {
  const game = games.filter((game) => {
    const player = game.players.filter((player) => player.get('playerId') === playerId)

    return player.size > 0
  })

  return game[0]
}
