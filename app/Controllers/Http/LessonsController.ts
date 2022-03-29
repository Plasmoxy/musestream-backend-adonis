import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lesson from 'App/Models/Lesson'
import { schema } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'

export default class LessonsController {

  public async getLesson({request}: HttpContextContract) {
    const l = await Lesson.find(request.param('id'))
    if (l === null) throw new Exception('Lesson not found', 404)
    await l.load('classStudent')
    return l
  }

  public async updateLesson({request}: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({
        notes: schema.string.optional(),
        start: schema.string.optional(),
        end: schema.string.optional(),
      }),
    })

    const l = await Lesson.find(request.param('id'))
    if (l === null) throw new Exception('Lesson not found', 404)
    
    const start = body.start ? DateTime.fromISO(body.start) : undefined
    const end = body.end ? DateTime.fromISO(body.end) : undefined
    
    const lstart = start ?? l.start
    const lend = end ?? l.end
    
    if (lend.diff(lstart).toMillis() < 0) throw new Exception('Invalid dates', 400)

    if (start) l.merge({start})
    if (end) l.merge({end})
    if (body.notes) l.merge({notes: body.notes})
    
    // update
    return l.save()
  }

  public async deleteLesson({request}: HttpContextContract) {
    const l = await Lesson.find(request.param('id'))
    if (l === null) throw new Exception('Lesson not found', 404)
    await l.delete()
  }

}
