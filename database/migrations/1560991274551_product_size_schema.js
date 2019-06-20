'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSizeSchema extends Schema {
  up () {
    this.create('product_sizes', table => {
      table.increments()
      table.decimal('price', 10).notNullable()
      table.string('menu_name').notNullable()
      table.string('cart_name').notNullable()
      table.enum('cart_image_display', ['type', 'size']).notNullable()
      table
        .integer('product_type_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('product_types')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_sizes')
  }
}

module.exports = ProductSizeSchema
