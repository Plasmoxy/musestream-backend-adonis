import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  public async all() {
    return await User.all()
  }

  public async get({ request }: HttpContextContract) {
    const usr = await User.find(request.param('id'))
    
    if (usr === null) {
      throw new Exception('User not found', 404)
    }
    return usr
  }

  public async update({ request }: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({
        name: schema.string.optional(),
        type: schema.string.optional(),
        email: schema.string.optional(),
      }),
    })

    const usr = await User.find(request.param('id'))
    if (usr === null) throw new Exception('User not found', 404)

    // merge request body into foudn user and save
    return await usr.merge(body).save()
  }

  public async delete({ request }: HttpContextContract) {
    const usr = await User.find(request.param('id'))
    
    if (usr === null) throw new Exception('User not found', 404)
    if (usr.id === 1) throw new Exception('Admin delete not allowed', 400)
    
    await usr.delete()
  }
}
