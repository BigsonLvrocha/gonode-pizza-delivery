'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSizeSchema extends Schema {
  up () {
    this.create('order_sizes', table => {
      table.increments()
      table
        .integer('order_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orders')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('product_size_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('product_sizes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('order_sizes')
  }
}

module.exports = OrderSizeSchema
