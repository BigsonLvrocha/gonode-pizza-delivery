'use strict'

const Antl = use('Antl')
class ProductType {
  get validateAll () {
    return true
  }

  get rules () {
    const typeId = this.ctx.params.id
    const productId = this.ctx.params.product_id
    return {
      menu_name: `required|unique_compound:product_types,menu_name,product_id,${productId},id,${typeId}`,
      cart_name: `required|unique:product_types,cart_name,id,${typeId}`,
      file_id: 'required|integer|min:1'
    }
  }
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ProductType
