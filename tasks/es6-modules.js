var log = require('../lib/logger')
  , transpiler = require('es6-module-transpiler')
  , Container = transpiler.Container
  , FileResolver = transpiler.FileResolver
  , BundleFormatter = transpiler.formatters.bundle
  , log = require('../lib/logger')

module.exports = function () {
  log = log.start('Es6 modules started')
  return function (fn) {
    var container = new Container({
      resolvers: [new FileResolver(['./'])],
      formatter: new BundleFormatter()
    })
    try {
      container.getModule('app/app.js')
      container.write('build/es5.js')
      log.finish('Es6 modules complete')
      return fn(null, {status: 'ok'})
    } catch (err) {
      log.error('Es6 modules ' + err.toString())
      return fn(null, {status: 'fail'})
    }
  }
}
