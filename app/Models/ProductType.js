'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductType extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeUpdate', 'ProductTypeHook.checkUniqueCartNameOnUpdate')
    this.addHook('beforeSave', 'ProductTypeHook.checkUniqueMenuNameOnSave')
  }
  product () {
    return this.belongsTo('App/Models/Product')
  }
  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = ProductType
