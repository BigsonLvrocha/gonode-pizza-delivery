'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class IsAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth, response }, next, [negate = 0]) {
    // call next to advance the request
    if (negate ? auth.user.role === 'admin' : auth.user.role !== 'admin') {
      return response.status(401).send({
        error: {
          message: 'You are not allowed to perform this action'
        }
      })
    }
    await next()
  }
}

module.exports = IsAdmin
