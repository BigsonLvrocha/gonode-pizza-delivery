'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UniqueViolationException extends LogicalException {
  handle (err, { response }) {
    return response.status(409).send({
      error: {
        message: err.message
      }
    })
  }
}

module.exports = UniqueViolationException
