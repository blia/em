var logger = require('../lib/logger')
  , thunkify = require('thunkify')
  , cp = thunkify(require('ncp').ncp)

module.exports = function () {
  var log = logger.start('Assets started')
  return function *() {
    try {
      yield cp('public', 'build')
      log.finish('Assets build success')
      return {status: 'ok'}
    } catch (err) {
      log.error('Assets '+ err)
      return {status: 'fail'}
    }
  }
}
