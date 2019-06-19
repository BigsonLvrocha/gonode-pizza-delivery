'use strict'

class Product {
  get rules () {
    return {
      name: 'required|unique:products',
      description: 'required',
      estimated: 'required',
      file_id: 'required|integer|min:1'
    }
  }
}

module.exports = Product
