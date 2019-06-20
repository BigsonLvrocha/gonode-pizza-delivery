'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductTypeSchema extends Schema {
  up () {
    this.create('product_types', table => {
      table.increments()
      table.string('menu_name').notNullable()
      table
        .string('cart_name')
        .unique()
        .notNullable()
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.unique(['product_id', 'menu_name'])
      table.timestamps()
    })
  }

  down () {
    this.drop('product_types')
  }
}

module.exports = ProductTypeSchema
