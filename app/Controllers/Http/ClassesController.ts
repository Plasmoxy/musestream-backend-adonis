import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'
import { schema } from '@ioc:Adonis/Core/Validator'
import Class from 'App/Models/Class'

export default class ClassesController {
  public async getClassesOfUser({ auth }: HttpContextContract) {
    return auth.user
  }

  public async createNewClass({ request }: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({
        title: schema.string(),
        description: schema.string(),
        instrument: schema.string(),
        difficulty: schema.string(),
        teacherId: schema.number(),
      }),
    })
  }

  public async getClass({}: HttpContextContract) {}

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
  }

  public async deleteClass({ request }: HttpContextContract) {
    const cls = await Class.find(request.param('id'))

    if (cls === null) throw new Exception('Class not found', 404)

    await cls.delete()
  }
}
