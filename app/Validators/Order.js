'use strict'

class Order {
  get rules () {
    return {
      observations: 'string',
      cep: 'required|regex:[0-9]{5}-[0-9]{3}',
      street: 'required',
      district: 'required',
      number: 'required',
      sizes: 'required|array|idsExists:product_sizes'
    }
  }
}

module.exports = Order
