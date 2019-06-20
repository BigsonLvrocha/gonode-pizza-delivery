'use strict'

class ProductSize {
  get rules () {
    return {
      price: 'required|number',
      menu_name: 'required',
      cart_name: 'required',
      cart_image_display: 'required|in:type,size',
      file_id: 'required|integer|min:1'
    }
  }
}

module.exports = ProductSize
