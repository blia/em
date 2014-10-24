// Ember Development Kit

var log = require('./logger').start('Starting Ember development kit')
  , tasks = require('../tasks')
  , co = require('co')

var Em = function() {
  var ver = '0.0.1-alpha.3'

  co(function *() {
    var run = []
    log.info('Version: ' + ver)
    log.finish('Loaded')
    log.start('Starting tasks')

    for (var task in tasks) {
      if (tasks.hasOwnProperty(task)) {
        run.push(tasks[task]())
      }
    }
    console.log(yield run);
    log.finish('Build success')
  })()
}

module.exports = Em
