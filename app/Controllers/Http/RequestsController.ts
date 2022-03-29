import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Class from 'App/Models/Class'
import ClassStudent from 'App/Models/ClassStudent'
import ClassRequest from 'App/Models/ClassRequest'
import { schema } from '@ioc:Adonis/Core/Validator'
import {DateTime} from 'luxon'

export default class RequestsController {
  public async getClassRequests({ request }: HttpContextContract) {
    const cls = await Class.find(request.param('id'))
    if (cls === null) throw new Exception('Class not found', 404)
    return await cls.related('requests').query()
  }

  public async createClassRequest({request, auth}: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({
        message: schema.string(),
      }),
    })
    
    const cls = await Class.find(request.param('id'))
    if (cls === null) throw new Exception('Class not found', 404)
    
    return await cls.related('requests').create({
      classId: cls.id,
      studentId: auth.user!.id,
      date: DateTime.now(),
      message: body.message,
    })
  }

  public async acceptRequest({request, auth}: HttpContextContract) {
    
    const req = await ClassRequest.find(request.param('requestId'))
    if (req === null) throw new Exception('Request not found', 404)
    await req.load('class')
    
    if (auth.user!.id !== req.class.teacherId) throw new Exception('You must be teacher of this class', 400)
    
    // musnt be in class
    const studentInClass = await ClassStudent.query().where({
      classId: req.classId,
      studentId: req.studentId,
    }).first()
    
    if (studentInClass !== null) {
      throw new Exception('Student is already in class', 400)
    }
    
    // other wise add to class
    await ClassStudent.create({
      classId: req.classId,
      studentId: req.studentId,
    })
  }

  public async deleteRequest({request, auth}: HttpContextContract) {
    const req = await ClassRequest.find(request.param('requestId'))
    if (req === null) throw new Exception('Request not found', 404)
    await req.load('class')
    
    if (auth.user!.id !== req.class.teacherId) throw new Exception('You must be teacher of this class', 400)
    
    await req.delete()
  }
}
