'use strict'

const Order = use('App/Models/Order')

class UserOrderController {
  async index ({ auth }) {
    const orders = Order.query()
      .with('sizes')
      .where('user_id', auth.user.id)
      .orderBy('created_at', 'desc')
      .fetch()
    return orders
  }
}

module.exports = UserOrderController
