// Libs

module.exports = (context, socket, data, callback) => {
  try {
    const game = context.games.filter((game) => game.id === data)[0]

    game.start()
    game.createRound()

    context.io.to(game.getRoom()).emit('refreshGame', game)
  } catch (err) {
    console.log(err)
    socket.emit('error', 'Jogo não encontrado')
  }
}
