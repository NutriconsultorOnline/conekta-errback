'use strict'

var assign = require('xtend/mutable')
var dot = require('dot-prop')

var methods = conektaErrback.methods = {
  async: [
    'token.create'
  ],
  sync: [
    'setPublicKey',
    'card.validateNumber',
    'card.validateExpirationDate',
    'card.validateCVC',
    'card.getBrand'
  ]
}

module.exports = conektaErrback

function conektaErrback (Conekta) {
  if (typeof Conekta !== 'object') throw new Error('Conekta.js must be provided')

  var conekta = {}

  methods.async.forEach(function (method) {
    var names = method.split('.')
    var receiverName = names[0]
    var methodName = names[1]
    dot.set(conekta, method, toErrback(methodName, Conekta[receiverName]))
  })

  methods.sync.forEach(function (method) {
    dot.set(conekta, method, dot.get(Conekta, method))
  })

  return conekta
}

function toErrback (method, receiver) {
  return function errback () {
    var args = Array.prototype.slice.call(arguments)
    var callback = args.pop()

    receiver[method].apply(receiver, args.concat(function onConekta (response) {
      callback(null, response)
    }, function errorConekta (error) {
      callback(assign(new Error(), error))
    }))
  }
}
