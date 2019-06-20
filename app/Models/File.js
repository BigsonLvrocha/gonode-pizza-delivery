'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class File extends Model {
  static get computed () {
    return ['url']
  }

  getUrl ({ id }) {
    return `${Env.get('APP_URL')}/file/${id}`
  }

  products () {
    return this.hasMany('App/Models/Product')
  }

  productTypes () {
    return this.hasMany('App/Models/ProductType')
  }

  productSizes () {
    return this.hasMany('App/Models/ProductSize')
  }
}

module.exports = File
