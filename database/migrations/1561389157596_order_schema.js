'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
      table.text('observations')
      table.string('cep', 10).notNullable()
      table.string('street').notNullable()
      table.integer('order_number').notNullable()
      table.string('district').notNullable()
      table.integer('number').notNullable()
      table
        .enum('status', ['placed', 'confirmed', 'delivering'])
        .defaultsTo('placed')
      table.timestamp('deleted_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
