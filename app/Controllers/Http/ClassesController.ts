import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'
import { schema } from '@ioc:Adonis/Core/Validator'
import Class from 'App/Models/Class'
import User from 'App/Models/User'
import authConfig from 'Config/auth'

export default class ClassesController {
  public async getClassesOfUser({ auth }: HttpContextContract) {
    const classes = await auth.user!.related('classes').query()
    return classes
  }

  public async createNewClass({ request, auth }: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({
        title: schema.string(),
        description: schema.string(),
        instrument: schema.string(),
        difficulty: schema.string(),
      }),
    })
    const newClass = await auth.user!.related('classes').create(body)
    return newClass
  }

  public async getClass({ request }: HttpContextContract) {
    const cls = await Class.find(request.param('id'))
    if (cls == null) throw new Exception('Class not found', 404)

    return cls
  }

  public async updateClass({ request }: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({
        title: schema.string(),
        description: schema.string(),
        instrument: schema.string(),
        difficulty: schema.string(),
        teacherId: schema.number(),
      }),
    })

    const cls = await Class.find(request.param('id'))
    if (cls === null) throw new Exception('User not found', 404)

    return await cls.merge(body).save()
  }

  public async deleteClass({ request }: HttpContextContract) {
    const cls = await Class.find(request.param('id'))

    if (cls === null) throw new Exception('Class not found', 404)

    await cls.delete()
  }
}
