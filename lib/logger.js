// Simple colorized log with timestamp
/* jshint laxcomma: true, asi: true */
var Colors = require('colors')

module.exports = {
  time: null,
  start: function (msg) {
    this.time = new Date()
    console.log(msg.yellow)
  },
  info: function (msg) {
    console.log(msg.cyan)
  },
  error: function (msg) {
    console.log(msg.red)
  },
  finish: function (msg) {
    var ms = new Date() - this.time
    console.log(msg.green + ' in '.green + ms + 'ms'.green)
  }
}
