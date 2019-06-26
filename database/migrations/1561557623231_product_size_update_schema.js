'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSizeUpdateSchema extends Schema {
  up () {
    this.table('product_sizes', (table) => {
      table.float('image_scale').notNullable().defaultsTo(1.0)
    })
  }

  down () {
    this.table('product_sizes', (table) => {
      table.dropColumn('image_scale')
    })
  }
}

module.exports = ProductSizeUpdateSchema
