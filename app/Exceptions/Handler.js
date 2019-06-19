'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

const Env = use('Env')
const Youch = use('youch')
const Config = use('Config')
const Raven = require('raven')
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    switch (error.name) {
      case 'ValidationError':
        return response.status(error.status).send(error.messages)
      default:
        if (Env.get('NODE_ENV') === 'development') {
          const youch = new Youch(error, request.request)
          const errorJSON = await youch.toJSON()
          return response.status(error.status).send(errorJSON)
        }
        return response.status(error.status)
    }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
    if (Env.get('NODE_ENV') === 'production') {
      Raven.config(Config.get('services.sentry.dsn'))
      Raven.captureException(error)
    }
    console.error(error)
  }
}

module.exports = ExceptionHandler
