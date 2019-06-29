'use strict'

const Antl = use('Antl')

class OrderUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      status: 'required|in:placed,confirmed,delivering'
    }
  }
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = OrderUpdate
