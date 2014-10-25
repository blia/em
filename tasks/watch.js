var logger = require('../lib/logger')
  , watchTree = require("fs-watch-tree").watchTree
  , co = require('co')
module.exports = function (jobs) {
  var log = logger.start('Watcher started')
    , that = this
    , done
  watchTree('app', function (evt) {
    log.info(evt.name)
    jobs.forEach(function (task) {
      if(task.filter.test(evt.name)){
        co(function *() {
          yield task.task()
        })()
      }
    })
  })
}
