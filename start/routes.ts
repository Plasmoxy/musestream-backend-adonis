/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// root
Route.get('/', async ({ request }) => {
  return { hello: 'world', t: request.body }
})

// debug stuff
Route.group(() => {
  Route.get('', 'DebugsController.index')
  Route.get('/hello', 'DebugsController.hello')
  
  // require auth on this route
  Route.get('/auth', 'DebugsController.auth').middleware('auth')
  
  // NOTE: you can specify that this route is only for admin / only for teacher by addding :admin / :teacher
  // Route.get('/auth', 'DebugsController.auth').middleware('auth:admin')
  
}).prefix('/debug')

// Auth
Route.post('/login', 'AuthController.login')
Route.post('/register', 'AuthController.register')
