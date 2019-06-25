'use strict'

class SessionController {
  async store ({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return token
  }

  async index ({ response, auth }) {
    return auth.user
  }
}

module.exports = SessionController
