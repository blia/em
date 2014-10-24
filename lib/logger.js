// Simple colorized log with timestamp
/* jshint laxcomma: true, asi: true */
var Colors = require('colors')

var Logger = function (msg) {
  this.time = new Date();
  if (msg)
    console.log(msg.yellow);
};

Logger.prototype.start = function (msg) {
  this.time = new Date();
  if (msg)
    console.log(msg.yellow);
};
Logger.prototype.info = function (msg) {
  console.log(msg.cyan);
};
Logger.prototype.error = function (msg) {
  console.log(msg.red);
};
Logger.prototype.finish = function (msg) {
  var ms = new Date() - this.time;
  console.log(msg.green +' in '.green+ms+'ms'.green);
};

module.exports = {
  start: function (msg) {
    return new Logger(msg)
  },
  info: function (msg) {
    console.log(msg.cyan)
  },
  error: function (msg) {
    console.log(msg.red)
  }
}
