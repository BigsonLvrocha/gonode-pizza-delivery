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
      .withPivot(['id', 'amount'])
  }

  static get deleteTimestamp () {
    return 'deleted_at'
  }

  static get dates () {
    return super.dates.concat(['deleted_at'])
  }

  static get computed () {
    return ['total']
  }

  getTotal (item) {
    if (this.$relations.sizes) {
      console.log(this.$relations.sizes.rows[0].$relations)
      return this.$relations.sizes.rows.reduce(
        (acc, current) => acc + current.price * current.$relations.pivot.amount,
        0
      )
    }
    return undefined
  }
}

module.exports = Order
