'use strict'

const Antl = use('Antl')

class Order {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      observations: 'string',
      cep: 'required|regex:[0-9]{5}-[0-9]{3}',
      street: 'required',
      district: 'required',
      number: 'required',
      sizes: 'required|array|no_duplicates:id|ids_exists:product_sizes,id,id'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Order
