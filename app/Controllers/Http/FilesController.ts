import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FilesController {
  // GET /files
  public async all({}: HttpContextContract) {}

  // POST /files
  public async create({}: HttpContextContract) {}

  // GET /files/{recordId}
  public async get({}: HttpContextContract) {}

  // PUT /files/{recordId}
  public async update({}: HttpContextContract) {}

  // DELETE /files{recodId}
  public async delete({}: HttpContextContract) {}
}
