'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductSize extends Model {
  productType () {
    return this.belongsTo('App/Models/ProductType')
  }

  file () {
    return this.belongsTo('App/Models/File')
  }

  orders () {
    return this.belongsToMany('App/Models/Order')
      .pivotTable('order_sizes')
      .withPivot(['id'])
  }
}

module.exports = ProductSize
