import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessagesController {
  // GET /leassons/{id}/messages
  public async getMessages({}: HttpContextContract) {}

  // POST /leassons{id}/messages
  public async postMessage({}: HttpContextContract) {}
}
