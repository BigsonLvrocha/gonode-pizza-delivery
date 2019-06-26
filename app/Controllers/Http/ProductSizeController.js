'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ProductSize = use('App/Models/ProductSize')

/**
 * Resourceful controller for interacting with productsizes
 */
class ProductSizeController {
  /**
   * Show a list of all productsizes.
   * GET productsizes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params, request, response, view }) {
    const sizes = await ProductSize.query()
      .with('file')
      .where('product_type_id', params.type_id)
      .fetch()
    return sizes
  }

  /**
   * Create/save a new productsize.
   * POST productsizes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response }) {
    const data = request.only([
      'price',
      'menu_name',
      'cart_name',
      'cart_image_display',
      'file_id',
      'image_scale'
    ])
    const size = await ProductSize.create({
      ...data,
      product_type_id: params.type_id
    })
    return size
  }

  /**
   * Display a single productsize.
   * GET productsizes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const size = await ProductSize.findOrFail(params.id)
    return size
  }

  /**
   * Update productsize details.
   * PUT or PATCH productsizes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only([
      'price',
      'menu_name',
      'cart_name',
      'cart_image_display',
      'file_id',
      'image_scale'
    ])
    const size = await ProductSize.findOrFail(params.id)
    size.merge(data)
    await size.save()
    await size.load('file')
    return size
  }

  /**
   * Delete a productsize with id.
   * DELETE productsizes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const size = await ProductSize.findOrFail(params.id)
    await size.delete()
  }
}

module.exports = ProductSizeController
