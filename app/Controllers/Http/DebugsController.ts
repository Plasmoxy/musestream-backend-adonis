import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DebugsController {
  public async index({ request }: HttpContextContract) {
    return {
      dogs: ['a', 'b', 'c'],
      queryString: request.qs(),
      params: request.params(),
    }
  }

  public async hello({ logger }: HttpContextContract) {
    logger.info('Hello')
    return {}
  }
}
