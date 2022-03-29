import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Class from 'App/Models/Class'

export default class FilesController {
  public async uploadFile({request}: HttpContextContract) {
    const cls = await Class.find(request.param('id'))
    if (cls === null) throw new Exception('Class not found', 404)
    
    const file = request.file('file')
    if (file === null) throw new Exception('No file provided', 400)
    await file.move('public/static/')
    
    return await cls.related('files').create({
      path: '/static/'+file.fileName,
      title: file.fileName,
    })
  }
  
  public async getClassFiles({request}: HttpContextContract) {
    const cls = await Class.find(request.param('id'))
    if (cls === null) throw new Exception('Class not found', 404)
    return await cls.related('files').query()
  }
}
