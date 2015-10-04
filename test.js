/*!
 * always-generator <https://github.com/hybridables/always-generator>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var voa = require('voa')
var test = require('assertit')
var isGenFn = require('is-es6-generator-function')
var alwaysGenerator = require('./index')

test('should transfrom fs.readFileSync to function which returns generator fn', function (done) {
  var readFileSync = alwaysGenerator(fs.readFileSync)
  var gen = readFileSync('./package.json', 'utf8')
  test.strictEqual(typeof readFileSync, 'function')
  test.strictEqual(isGenFn(gen), true)
  done()
})

test('should transfrom fs.readFile to function which returns generator fn', function (done) {
  var readFileAsync = alwaysGenerator(fs.readFile)
  var gen = readFileAsync('./package.json', 'utf8')
  test.strictEqual(typeof readFileAsync, 'function')
  test.strictEqual(isGenFn(gen), true)
  done()
})

test('should return result when yield generator function', function (done) {
  var readFile = alwaysGenerator(fs.readFile)

  voa(function * () {
    var res = yield readFile('./package.json', 'utf8')
    test.ok(res.indexOf('"license": "MIT"') !== -1)
    return res
  }).then(function (res) {
    test.ok(res.indexOf('"license": "MIT"') !== -1)
    done()
  }, done)
})

