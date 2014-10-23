var log = require('../lib/logger')
  , transpiler = require('es6-module-transpiler')
  , Container = transpiler.Container
  , FileResolver = transpiler.FileResolver
  , BundleFormatter = transpiler.formatters.bundle;


module.exports = function () {
  // var container = new Container({
  //   resolvers: [new FileResolver(['./'])],
  //   formatter: new BundleFormatter()
  // })
  // try {
  //   container.getModule('app/app.js')
  //   container.write('build/es5.js')
  // } catch (err) {
  //   log.error('ES6 '+err.toString())
  // }

}
