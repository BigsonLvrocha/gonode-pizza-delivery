'use strict'

const ProductSizeHook = (exports = module.exports = {})
const UniqueViolationException = use('App/Exceptions/UniqueViolationException')
const ProductSize = use('App/Models/ProductSize')

ProductSizeHook.checkUniqueMenu = async sizeInstance => {
  if (!sizeInstance.dirty.menu_name) {
    return
  }
  const inDB = await ProductSize.query()
    .where('id', '!=', sizeInstance.id || 0)
    .where('product_type_id', sizeInstance.product_type_id)
    .where('menu_name', sizeInstance.menu_name)
    .getCount()
  if (inDB === 0) {
    return 0
  }
  throw new UniqueViolationException(
    'There is another size with the same menu name'
  )
}

ProductSizeHook.checkUniqueCart = async sizeInstance => {
  if (!sizeInstance.dirty.cart_name) {
    return
  }
  const inDB = await ProductSize.query()
    .where('id', '!=', sizeInstance.id || 0)
    .where('product_type_id', sizeInstance.product_type_id)
    .where('cart_name', sizeInstance.cart_name)
    .getCount()
  if (inDB === 0) {
    return 0
  }
  throw new UniqueViolationException(
    'There is another size with the same cart name'
  )
}
