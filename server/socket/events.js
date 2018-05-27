// Libs
const debug = require('debug')('truco-royale:events')

module.exports = {
  'connection': (context, socket, data) => {
    debug(`New player connected, ${socket.id}`)
    debug(`Actual games:`)
    debug(context.games)
    debug(`Actual sockets:`)
    debug(context.sockets)
    debug(`Data received:`)
    debug(data)
  }
}
