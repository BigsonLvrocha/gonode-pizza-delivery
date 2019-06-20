'use strict'

class ProductType {
  get rules () {
    return {
      menu_name: 'required',
      cart_name: 'required|unique:product_types',
      file_id: 'required|integer|min:1'
    }
  }
}

module.exports = ProductType
