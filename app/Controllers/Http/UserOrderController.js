'use strict'

const Order = use('App/Models/Order')

class UserOrderController {
  async index ({ auth }) {
    const orders = Order.query()
      .with('sizes')
      .where('user_id', auth.user.id)
      .fetch()
    return orders
  }
}

module.exports = UserOrderController
