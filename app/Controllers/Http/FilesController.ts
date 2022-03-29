import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FilesController {
  public async getAllFiles({}: HttpContextContract) {}

  public async uploadFile({}: HttpContextContract) {}

  public async downloadFile({}: HttpContextContract) {}

  public async updateFile({}: HttpContextContract) {}

  public async deleteFile({}: HttpContextContract) {}
}
