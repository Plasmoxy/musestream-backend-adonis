import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessagesController {
  public async getMessages({}: HttpContextContract) {}

  public async postMessage({}: HttpContextContract) {}
}
