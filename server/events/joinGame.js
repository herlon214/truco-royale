// Libs

module.exports = (context, socket, data, callback) => {
  try {
    const game = context.games.filter((game) => game.id === data)[0]

    // Join game room
    socket.join(game.getRoom())

    game.newPlayer({ playerId: socket.id, name: 'Test', role: ['admin'] })
    context.io.to(game.getRoom()).emit('refreshGame', game)
  } catch (err) {
    console.log(err)
    socket.emit('error', 'Jogo não encontrado')
  }
}
