'use strict'

class Order {
  get rules () {
    return {
      observations: 'string',
      cep: 'required|regex:[0-9]{5}-[0-9]{3}',
      street: 'required',
      district: 'required',
      number: 'required',
      sizes: 'required|array|noDuplicates:id|idsExists:product_sizes,id,id'
    }
  }
}

module.exports = Order
