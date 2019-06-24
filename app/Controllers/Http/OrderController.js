'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Order = use('App/Models/Order')
const Database = use('Database')

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const statusFilter = request.get().status
      ? request.get().status
      : ['placed', 'confirmed']
    const orders = await Order.query()
      .with('sizes')
      .with('user')
      .with('sizes.file')
      .with('sizes.productType')
      .with('sizes.productType.file')
      .whereIn('status', statusFilter)
      .whereNull('deleted_at')
      .fetch()
    return orders
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only([
      'observations',
      'cep',
      'street',
      'order_number',
      'number',
      'district'
    ])
    const sizes = request.input('sizes', [])
    const orderNumber =
      (await Order.query()
        .where('user_id', auth.user.id)
        .getCount()) + 1
    const trx = await Database.beginTransaction()
    const order = await Order.create(
      {
        ...data,
        order_number: orderNumber,
        user_id: auth.user.id
      },
      trx
    )
    await order.sizes().attach(sizes, () => {}, trx)
    await trx.commit()
    await Promise.all([order.load('sizes'), order.load('user')])
    return order
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const order = await Order.findOrFail(params.id)
    return order
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const order = await Order.findOrFail(params.id)
    order.status = request.input('status')
    await Promise.all([order.load('sizes'), order.load('user')])
    return order
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const order = await Order.findOrFail(params.id)
    order.deleted_at = new Date()
    await order.save()
  }
}

module.exports = OrderController
