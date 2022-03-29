import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RequestsController {
  // GET /classes/{id}requests
  public async get({}: HttpContextContract) {}

  // POST /classes/{id}requests
  public async create({}: HttpContextContract) {}

  // POST /requests/{requestId}
  public async accept({}: HttpContextContract) {}

  // DELETE /files{recodId}
  public async delete({}: HttpContextContract) {}
}
