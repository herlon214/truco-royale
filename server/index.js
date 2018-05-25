// Libs
const io = require('socket.io')

module.exports = async (app) => {
  // Bind socket to app
  io(app)
}
