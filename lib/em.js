// Ember Development Kit

var log = require('./logger')
  , tasks = require('../tasks')
  , co = require('co')
var Em = function() {
  var ver = '0.0.1-alpha.2'
  var init = co(function *() {
    log.info('Starting Ember development kit')
    log.info('Version: '+ver)
    log.start('Building app')
    for (task in tasks) {
      if (tasks.hasOwnProperty(task)) {
        try {
          log.finish(yield tasks[task]())
        } catch (err) {
          log.error(err)
        }
      }
    }
  })
  init()
}

module.exports = Em
