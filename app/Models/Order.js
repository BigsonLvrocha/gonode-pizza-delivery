'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  sizes () {
    return this.belongsToMany('App/Models/ProductSize')
      .pivotTable('order_sizes')
      .withPivot(['id'])
  }

  static get deleteTimestamp () {
    return 'deleted_at'
  }
}

module.exports = Order
