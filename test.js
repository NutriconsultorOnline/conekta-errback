'use strict'

var test = require('tape')
var stub = require('sinon').stub
var Conekta = window.Conekta
var conektaErrback = require('./')

test(function (t) {
  t.throws(conektaErrback, /Conekta/, 'requires Conekta')

  var conekta = conektaErrback(Conekta)

  t.equal(conekta.token.validateNumber, Conekta.token.validateNumber, 'references sync methods')

  t.test('createToken', function (t) {
    t.plan(3)
    stub(Conekta.token, 'create').callsArgWithAsync(1, {id: 'token'})
    var data = {}
    conekta.token.create(data, function (err, res) {
      if (err) return t.end(err)

      t.equal(res.id, 'token')
      t.equal(Conekta.token.create.callCount, 1)
      var args = Conekta.token.create.firstCall.args
      t.equal(args[0], data)
    })
  })

  t.test('errors', function (t) {
    t.plan(7)

    var response = {
      type: 'parameter_validation_error',
      message: 'Something went wrong on Conekta\'s end',
      message_to_purchaser: 'Your code could not be processed, please try again later',
      error_code: 'invalid_expiry_month',
      param: 'card[exp_month]'
    }

    Conekta.token.create.callsArgWithAsync(2, response)
    conekta.token.create({}, function (err) {
      t.ok(err instanceof Error)
      t.equal(err.type, response.type)
      t.equal(err.message, response.message)
      t.equal(err.message_to_purchaser, response.message_to_purchaser)
      t.equal(err.error_code, response.error_code)
      t.equal(err.param, response.param)
      t.deepEqual(err, response)
    })
  })

  t.end()
})
