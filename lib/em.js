// Ember Development Kit

var log = require('./logger')
  , tasks = require('../tasks')
var Em = function() {
  var ver = '0.0.1-alpha.2'
  var init = function *() {
    log.info('Starting Ember development kit')
    log.info('Version: '+ver)
    log.start('Building app')
    yield tasks.es6modules()
    log.finish('yo!')
  }
  var init = init()
  init.next()


}

module.exports = Em
