'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ProductType = use('App/Models/ProductType')

/**
 * Resourceful controller for interacting with producttypes
 */
class ProductTypeController {
  /**
   * Show a list of all producttypes.
   * GET producttypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, params }) {
    const types = await ProductType.query()
      .with('file')
      .where('product_id', params.id)
      .fetch()
    return types
  }

  /**
   * Create/save a new producttype.
   * POST producttypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, params }) {
    const data = request.only(['menu_name', 'cart_name', 'file_id'])
    const type = await ProductType.create({
      ...data,
      product_id: params.product_id
    })
    await type.load('file')
    return type
  }

  /**
   * Display a single producttype.
   * GET producttypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const type = await ProductType.findOrFail(params.id)
    await Promise.all([type.load('file'), type.load('product')])
    return type
  }

  /**
   * Update producttype details.
   * PUT or PATCH producttypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only(['menu_name', 'cart_name', 'file_id'])
    const type = await ProductType.findOrFail(params.id)
    type.merge(data)
    await type.save()
    await type.load('file')
    return type
  }

  /**
   * Delete a producttype with id.
   * DELETE producttypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const type = await ProductType.findOrFail(params.id)
    type.delete()
  }
}

module.exports = ProductTypeController
