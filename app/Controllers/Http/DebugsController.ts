import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Class from 'App/Models/Class'

export default class DebugsController {
  public async index({ request, auth }: HttpContextContract) {
    const usr = auth.user!

    const newClass = await Class.create({
      description: 'yosh',
      instrument: 'piano',
      title: 'Yoo',
      teacherId: usr.id,
    })

    await newClass.load('teacher')

    return newClass
  }

  public async hello({ logger }: HttpContextContract) {
    logger.info('Hello')
    return {}
  }

  public async auth({ auth }: HttpContextContract) {
    return {
      authedUser: auth.user,
    }
  }
}
