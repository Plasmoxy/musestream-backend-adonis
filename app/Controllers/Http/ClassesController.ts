import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'
import { schema } from '@ioc:Adonis/Core/Validator'
import Class from 'App/Models/Class'

export default class ClassesController {
    // GET /classes
    public async getClassesOfUSer({ auth, request, response }: HttpContextContract) {
       
    }


    // POST /classes
    public async create({ auth, request, response }: HttpContextContract) {
        // TODO preverit ci je TEACHER
        const body = await request.validate({
            schema: schema.create({
                title: schema.string(),
                description: schema.string(),
                instrument: schema.string(),
                difficulty: schema.string(),
                teacherId: schema.number()
          }),
        })
    }


    // GET /classes/{id}
    public async get({ request }: HttpContextContract) {
        const cls =

        return cls
      }


    // PUT /classes/{id}
    public async update({ request }: HttpContextContract) {
        const body = await request.validate({
          schema: schema.create({
            title: schema.string(),
            description: schema.string(),
            instrument: schema.string(),
            difficulty: schema.string(),
            teacherId: schema.number()
          }),
        })
    }


    // DELETE /classes/{id}
    public async delete({ request }: HttpContextContract) {
      const cls = await Class.find(request.param('id'))
  
      if (cls === null) throw new Exception('Class not found', 404)

      await cls.delete()
    }
  }