'use strict'

const ProductTypeHook = (exports = module.exports = {})

const ProductType = use('App/Models/ProductType')
const UniqueViolationException = use('App/Exceptions/UniqueViolationException')

ProductTypeHook.checkUniqueCartNameOnUpdate = async typeInstance => {
  if (!typeInstance.dirty.cart_name) {
    return
  }
  const sameInDb = await ProductType.query()
    .where('cart_name', typeInstance.cart_name)
    .where('id', '!=', typeInstance.id)
    .getCount()
  if (sameInDb === 0) {
    return
  }
  throw new UniqueViolationException(
    'There is already another item with the same name'
  )
}

ProductTypeHook.checkUniqueMenuNameOnSave = async typeInstance => {
  if (!typeInstance.dirty.menu_name) {
    return
  }
  const sameInDb = await ProductType.query()
    .where('product_id', typeInstance.product_id)
    .where('menu_name', typeInstance.menu_name)
    .where('id', '!=', typeInstance.id || 0)
    .getCount()
  if (sameInDb === 0) {
    return
  }
  throw new UniqueViolationException(
    'There is already another item in the menu with the same name'
  )
}
