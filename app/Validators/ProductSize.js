'use strict'

const Antl = use('Antl')
class ProductSize {
  get validateAll () {
    return true
  }

  get rules () {
    const sizeId = this.ctx.params.id
    const typeId = this.ctx.params.type_id
    return {
      price: 'required|number',
      menu_name: `required|unique_compound:product_sizes,menu_name,product_type_id,${typeId},id,${sizeId}`,
      cart_name: `required|unique_compound:product_sizes,cart_name,product_type_id,${typeId},id,${sizeId}`,
      cart_image_display: 'required|in:type,size',
      file_id: 'required|integer|min:1',
      image_scale: 'required|number|above:0.0|under:1.0000000001'
    }
  }
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ProductSize
