var log = require('../lib/logger')
  , transpiler = require('es6-module-transpiler')
  , Container = transpiler.Container
  , FileResolver = transpiler.FileResolver
  , BundleFormatter = transpiler.formatters.bundle

module.exports = function () {
  return function (fn) {
    var container = new Container({
      resolvers: [new FileResolver(['./'])],
      formatter: new BundleFormatter()
    })
    try {
      container.getModule('app/app.js')
      container.write('build/es5.js')
      return fn(null, 'Es6 modules: buil success')
    } catch (err) {
      return fn('Es6 modules: ' + err.toString())
    }
  }
}
