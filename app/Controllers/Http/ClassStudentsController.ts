import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClassStudentsController {
    
  public async getStudents({}: HttpContextContract) {}

  public async addStudent({}: HttpContextContract) {}

  public async removeStudent({}: HttpContextContract) {}
  
  public async getLessons({}: HttpContextContract) {}
}
