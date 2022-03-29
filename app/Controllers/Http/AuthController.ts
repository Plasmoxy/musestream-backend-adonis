import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  // login - return token on login
  public async login({ auth, request, response }: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({
        name: schema.string(),
        password: schema.string(),
      }),
    })

    try {
      const token = await auth.use('api').attempt(body.name, body.password)
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async register({ request }: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({
        name: schema.string(),
        password: schema.string(),
        email: schema.string.optional(),
      }),
    })

    // custom exception when user exists, adonis automatically returns status code
    const userInDb = await User.findBy('name', body.name)
    if (userInDb !== null) {
      throw new Exception('User with name ' + body.name + ' already exists.', 400, 'USER_EXISTS')
    }

    // create user = password is automatically hashed because of model hook
    const newUser = await User.create(body)
    return newUser
  }
}
