'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSizeSchema extends Schema {
  up () {
    this.table('order_sizes', table => {
      table
        .integer('amount')
        .defaultsTo(1)
        .notNullable()
    })
  }

  down () {
    this.table('order_sizes', table => {
      table.dropColumn('amount')
    })
  }
}

module.exports = OrderSizeSchema
