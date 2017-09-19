# conekta-errback [![Build Status](https://travis-ci.org/NutriconsultorOnline/conekta-errback.svg?branch=master)](https://travis-ci.org/NutriconsultorOnline/conekta-errback) [![dependencies Status](https://david-dm.org/NutriconsultorOnline/conekta-errback/status.svg)](https://david-dm.org/NutriconsultorOnline/conekta-errback) [![devDependencies Status](https://david-dm.org/NutriconsultorOnline/conekta-errback/dev-status.svg)](https://david-dm.org/NutriconsultorOnline/conekta-errback?type=dev)

> Wrap Conekta.js async methods to use node-style callbacks


## Install

```
$ npm install --save conekta-errback
```


## Usage

```js
var conektaErrback = require('conekta-errback')

var conekta = conektaErrback(window.Conekta)

conekta.token.create(data, function (err, data) {
  if (err) { /* console.error(err) */ }
  else { /* token = data.id... */ }
})
```

## API

#### `conektaErrback(Conekta)` -> `object`

Wraps `window.Conekta` to call a Node-style callback (`function (err, data)`) with results instead of using Conekta's `function (response)` functions.

##### Conekta

*Required*  
Type: `object`

The Conekta.js browser library (`window.Conekta`).

The returned object wraps the following methods in addition to exposing utility methods:

* `card.createToken`

This configuration is exposed as `conektaErrback.methods` with `{async, sync}` containing arrays of dot property paths.

## License

MIT ©
