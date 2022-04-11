import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'
import { schema } from '@ioc:Adonis/Core/Validator'
import Class from 'App/Models/Class'

export default class ClassesController {
  
  public async getAllClasses() {
    return await Class.query().preload('teacher')
  }
  
  public async getClassesOfUser({ auth }: HttpContextContract) {
    // if its teacher, just get related classes
    if (auth.user!.type === 'teacher') {
      return await auth.user!.related('teacherClasses').query().preload('teacher')
    }
    
    // if its student, get student classes (through class_student pivot)
    if (auth.user!.type === 'student') {
      return await auth.user!.related('studentClasses').query().preload('teacher')
    }
  }

  public async createNewClass({ request, auth }: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({
        title: schema.string(),
        description: schema.string(),
        instrument: schema.string(),
      }),
    })
    const newClass = await auth.user!.related('teacherClasses').create(body)
    await newClass.load('teacher')
    return newClass
  }

  public async getClass({ request }: HttpContextContract) {
    const cls = await Class.find(request.param('id'))
    if (cls === null) throw new Exception('Class not found', 404)
    await cls.load('teacher')
    return cls
  }

  public async updateClass({ request, auth }: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({
        title: schema.string.optional(),
        description: schema.string.optional(),
        instrument: schema.string.optional(),
      }),
    })

    const cls = await Class.find(request.param('id'))
    if (cls === null) throw new Exception('Class not found', 404)
    if (cls.teacherId !== auth.user!.id) throw new Exception('You can edit only your classes', 400)
    await cls.merge(body).save()
    await cls.load('teacher')
    return cls
  }

  public async deleteClass({ request, auth }: HttpContextContract) {
    const cls = await Class.find(request.param('id'))

    if (cls === null) throw new Exception('Class not found', 404)
    if (cls.teacherId !== auth.user!.id) throw new Exception('You can edit only your classes', 400)
    
    await cls.delete()
  }
}
