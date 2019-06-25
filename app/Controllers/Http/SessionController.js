'use strict'

class SessionController {
  async store ({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return token
  }

  async index ({ response, auth }) {
    return {
      email: auth.user.email,
      username: auth.user.username,
      role: auth.user.role
    }
  }
}

module.exports = SessionController
