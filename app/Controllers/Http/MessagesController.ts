import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lesson from 'App/Models/Lesson'
import { schema } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'

export default class MessagesController {
  public async getMessages({request}: HttpContextContract) {
    const l = await Lesson.find(request.param('id'))
    if (l === null) throw new Exception('Lesson not found', 404)
    return await l.related('messages').query()
  }

  public async postMessage({request, auth}: HttpContextContract) {
    
    const body = await request.validate({
      schema: schema.create({
        content: schema.string(),
      }),
    })
    
    const l = await Lesson.find(request.param('id'))
    if (l === null) throw new Exception('Lesson not found', 404)
    
    return await l.related('messages').create({
      authorId: auth.user!.id,
      content: body.content,
      date: DateTime.now(),
    })
  }
}
