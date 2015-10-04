/*!
 * always-generator <https://github.com/hybridables/always-generator>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

module.exports = function alwaysGenerator (val) {
  var self = this
  return function generatorify () {
    var ctx = self || this
    var args = require('sliced')(arguments)
    return function * alwaysGeneratorFunction () {
      return require('always-promise').call(ctx, val).apply(ctx, args)
    }
  }
}
