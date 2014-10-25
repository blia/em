var logger = require('../lib/logger')
  , emblem = require('emblem')
  , compiler = require('ember-template-compiler')
  , thunkify = require('thunkify')
  , fs = require('fs')
  , co = require('co')
  , dir = thunkify(fs.readdir)
  , read = thunkify(fs.readFile)
  , write = thunkify(fs.writeFile)
  , info = thunkify(fs.stat)
  , dasherizeFileName = function (fname) {
    return fname.split('.').slice(0,-1).join('-')
  }
  , isEmptyObject = function (obj) {
    return !Object.keys(obj).length;
  }


module.exports = function () {
  var log = logger.start('Templates started')
  return function *() {
    var files
      , data = {}
      , other = {}
      , dirs = {}
      , compiled = ''
    try {
      files = yield dir('app/templates')
    } catch (err) {
      log.error('Templates Error: can\'t read app/templates')
      return {status: 'fail'}
    }
    if(files.length){
      var dirname = 'app/templates/'
      files.forEach(function (fname) {
        if (/\.(embl|emblem)$/.test(fname)) {
          data[dasherizeFileName(fname)] = read(dirname + fname, 'utf8')
        } else {
          other[fname] = info(dirname + fname)
        }
      })
      // TODO
      other = yield other
      for (var fname in yield other) {
        if (other.hasOwnProperty(fname) && other[fname].isDirectory()) {
          dirs[fname] = (dir(dirname + fname));
        }
      }
      dirs = yield dirs
      for (var subDirname in dirs) {
        if (dirs.hasOwnProperty(subDirname)) {
          if(dirs[subDirname].length){
            for (var i = 0; i < dirs[subDirname].length; i++) {
              if (/\.(embl|emblem)$/.test(dirs[subDirname][i])) {
                fname = subDirname + '/' + dirs[subDirname][i]
                data[dasherizeFileName(fname)] = read(dirname + fname, 'utf8')
              }
            }
          }
        }
      }
      data = yield data
      if (!isEmptyObject(data)) {
        for (var name in data) {
          if (data.hasOwnProperty(name)) {
            try {
              var c = emblem.precompile(compiler.EmberHandlebars, data[name])
              compiled += "Ember.TEMPLATES['"+ name +"'] = Ember.Handlebars.template(" + c + ");\n";
            } catch (err) {
              log.error('Templates ' + err.toString())
              return {status: 'fail'}
            }
          }
        }
        yield write('build/templates.js', compiled)
        log.finish('Templates build success')
        return {status: 'ok'}
      }
    }
    log.info('Templates: templates folder is empty')
    log.finish('Templates build success')
    return {status: 'ok'}
  }
}
