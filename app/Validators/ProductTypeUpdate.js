'use strict'

class ProductType {
  get rules () {
    return {
      menu_name: 'required',
      cart_name: 'required',
      file_id: 'required|integer|min:1'
    }
  }
}

module.exports = ProductType
