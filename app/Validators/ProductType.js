'use strict'

class ProductType {
  get rules () {
    const userId = this.ctx.params.id
    return {
      menu_name: 'required',
      cart_name: `required|unique:product_types,cart_name,id,${userId}`,
      file_id: 'required|integer|min:1'
    }
  }
}

module.exports = ProductType
