'use strict'

class OrderUpdate {
  get rules () {
    return {
      status: 'required|in:placed,confirmed,delivering'
    }
  }
}

module.exports = OrderUpdate
