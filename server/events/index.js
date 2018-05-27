// Libs
const debug = require('debug')('truco-royale:events')
const path = require('path')
const Game = require('../game')
const fs = require('fs')

// Parse events listed in the folder
const files = fs.readdirSync(path.join(__dirname))
  .filter((file) => file !== 'index.js')
  .map((name) => name.split('.')[0])

module.exports = files.reduce((acc, file) => {
  acc[file] = require('./' + file)

  return acc
}, {})
