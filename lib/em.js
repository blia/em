// Ember Development Kit

var log = require('./logger').start('Starting Ember development kit')
  , tasks = require('../tasks')
  , co = require('co')

var Em = function() {
  var ver = '0.0.1-alpha.3'

  co(function *() {
    var run = []
      , failTasks = []
    log.info('Version: ' + ver)
    log.finish('Loaded')
    log.start('Starting tasks')

    for (var task in tasks) {
      if (tasks.hasOwnProperty(task) && task !== 'watch') {
        run.push(tasks[task]())
      }
    }
    run = yield run
    failTasks = run.filter(function (task) {
      return task.status !== 'ok'
    })
    if(failTasks.length)
      return log.error('Fix bugs and start again')

    log.finish('Build success')
    tasks.watch([
        {filter: /\.js$/, task: tasks.es6Modules}
      , {filter: /\.(embl|emblem)$/, task: tasks.emblemHandlebars}
      , {filter: /\.styl$/, task: tasks.stylus}
    ])
  })()
}

module.exports = Em
