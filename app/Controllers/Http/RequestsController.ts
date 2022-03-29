import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RequestsController {
  public async getClassRequests({}: HttpContextContract) {}

  public async createClassRequest({}: HttpContextContract) {}

  public async acceptRequest({}: HttpContextContract) {}

  public async deleteRequest({}: HttpContextContract) {}
}
