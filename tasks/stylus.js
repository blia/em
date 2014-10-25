var logger = require('../lib/logger')
  , fs = require('fs')
  , stylus = require('stylus')
  , autoprefixer = require('autoprefixer-stylus')
module.exports = function () {
  var log = logger.start('Stylus started')
  return function (fn) {
    var style
    try {
      style = fs.readFileSync('app/styles/app.styl', 'utf8')
    } catch (err) {
      log.error('Stylus Error: can\'t read app/styles/app.styl')
      return fn(null, {status: 'fail'})
    }
    writeStyles = function (err, css) {
      if (err) {
        // TODO
        console.log(err.toString());
        log.error('Stylus ^')
        return fn(null, {status: 'fail'})
      }
      try {
        fs.writeFileSync('build/style.css', css)
        log.finish('Stylus build success')
        return fn(null, {status: 'ok'})
      } catch(err) {
        log.error('Stylus ', err.toString())
        return fn(null, {status: 'fail'})
      }
    }
    stylus(style)
      .set('filename', 'app/styles/app.styl')
      .use(autoprefixer())
      .set('sourcemap', {inline: true, comment: false})
      .render(writeStyles)
  }
}
