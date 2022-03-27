import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DebugsController {
  public async index(ctx: HttpContextContract) {
    return { dogs: ['a', 'b', 'c'] }
  }

  public async hello(ctx: HttpContextContract) {
    console.log('helo')
  }
}
