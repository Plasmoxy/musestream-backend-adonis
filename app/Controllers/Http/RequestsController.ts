// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RequestsController {
    // GET /classes/{id}requests
    public async get({ auth, request, response }: HttpContextContract) {
       
    }
    
    
    // POST /classes/{id}requests
    public async create({ auth, request, response }: HttpContextContract) {
    
    }
    

    // POST /requests/{requestId}
    public async accept({ auth, request, response }: HttpContextContract) {
    
    }

    
    // DELETE /files{recodId}
    public async delete({ request }: HttpContextContract) {
    }


}
