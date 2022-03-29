import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Class from 'App/Models/Class'
import { schema } from '@ioc:Adonis/Core/Validator'
import { Exception } from '@adonisjs/core/build/standalone'
import ClassStudent from 'App/Models/ClassStudent'
import User from 'App/Models/User'

export default class ClassStudentsController {
    
  public async getStudents({request}: HttpContextContract) {
    const cls = await Class.find(request.param('id'))
    if (cls === null) throw new Exception('Class not found', 404)
    return await cls.related('students').query()
  }

  public async addStudent({request}: HttpContextContract) {
    
    const body = await request.validate({
      schema: schema.create({
        studentName: schema.string(),
      }),
    })
    
    const cls = await Class.find(request.param('id'))
    if (cls === null) throw new Exception('Class not found', 404)
    
    const student = await User.findBy('name', body.studentName)
    if (student === null) throw new Exception('Student not found', 404)
    
    const studentInClass = await ClassStudent.query().where({
      classId: cls.id,
      studentId: student.id,
    }).first()
    
    if (studentInClass !== null) {
      throw new Exception('Student already in class', 400)
    }
    
    return await ClassStudent.create({
      classId: cls.id,
      studentId: student.id,
    })
  }

  public async removeStudent({request}: HttpContextContract) {
    await ClassStudent.query().where({
      classId: request.param('id'),
      studentId: request.param('studentId'),
    }).delete()
  }
  
  public async getLessons({request}: HttpContextContract) {
    const cs = await ClassStudent.query().where({
      classId: request.param('id'),
      studentId: request.param('studentId'),
    }).first()
    
    if (cs === null) throw new Exception('Student not in class or class doesnt exist', 404)
    
    return await cs.related('lessons').query()
  }
}
