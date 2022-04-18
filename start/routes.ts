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
})
  .prefix('/debug')
  .middleware('auth')

// Auth
Route.post('/login', 'AuthController.login')
Route.post('/register', 'AuthController.register')

// Users - admin only
Route.group(() => {
  Route.get('/', 'UsersController.all')
  Route.get('/:id', 'UsersController.get').where('id', Route.matchers.number())
  Route.put('/:id', 'UsersController.update').where('id', Route.matchers.number())
  Route.delete('/:id', 'UsersController.delete').where('id', Route.matchers.number())
})
  .prefix('/users')
  .middleware('auth:admin')

// Classes
Route.group(() => {
  // Basic classes
  Route.get('/', 'ClassesController.getClassesOfUser').middleware('auth:teacher,student')
  Route.post('/', 'ClassesController.createNewClass').middleware('auth:teacher')
  Route.get('/all', 'ClassesController.getAllClasses').middleware('auth')
  Route.get('/:id', 'ClassesController.getClass')
    .middleware('auth')
    .where('id', Route.matchers.number())
  Route.put('/:id', 'ClassesController.updateClass')
    .middleware('auth:teacher')
    .where('id', Route.matchers.number())
  Route.delete('/:id', 'ClassesController.deleteClass')
    .middleware('auth:teacher')
    .where('id', Route.matchers.number())

  // Class requests
  Route.get('/:id/requests', 'RequestsController.getClassRequests')
    .middleware('auth:teacher,student')
    .where('id', Route.matchers.number())
  Route.post('/:id/requests', 'RequestsController.createClassRequest')
    .middleware('auth:student')
    .where('id', Route.matchers.number())

  // Class students
  Route.get('/:id/students', 'ClassStudentsController.getStudents')
    .middleware('auth:teacher')
    .where('id', Route.matchers.number())
  Route.post('/:id/students', 'ClassStudentsController.addStudent')
    .middleware('auth:teacher')
    .where('id', Route.matchers.number())
  Route.delete('/:id/students/:studentId', 'ClassStudentsController.removeStudent')
    .middleware('auth:teacher')
    .where('id', Route.matchers.number())
    .where('studentId', Route.matchers.number())
    
  // Lessons
  Route.get('/:id/students/:studentId/lessons', 'ClassStudentsController.getLessons')
    .middleware('auth')
    .where('id', Route.matchers.number())
    .where('studentId', Route.matchers.number())
  Route.post('/:id/students/:studentId/lessons', 'ClassStudentsController.addLesson')
    .middleware('auth:teacher')
    .where('id', Route.matchers.number())
    .where('studentId', Route.matchers.number())
    
    
  // class lessons populated, if teacher all lessons, if student only student lessons
  Route.get('/:id/lessons', 'ClassesController.getLessons')
    .middleware('auth:teacher,student')
    .where('id', Route.matchers.number())
}).prefix('/classes')

// Requests
Route.group(() => {
  Route.post('/:requestId', 'RequestsController.acceptRequest')
    .middleware('auth:teacher')
    .where('requestId', Route.matchers.number())
  Route.delete('/:requestId', 'RequestsController.deleteRequest')
    .middleware('auth:teacher')
    .where('requestId', Route.matchers.number())
}).prefix('/requests')

// Lessons
Route.group(() => {
  Route.get(':id', 'LessonsController.getLesson')
    .middleware('auth')
    .where('id', Route.matchers.number())
  Route.put(':id', 'LessonsController.updateLesson')
    .middleware('auth:teacher')
    .where('id', Route.matchers.number())
  Route.delete(':id', 'LessonsController.deleteLesson')
    .middleware('auth:teacher')
    .where('id', Route.matchers.number())
    
  // Messages of lesson
  Route.get(':id/messages', 'MessagesController.getMessages')
    .middleware('auth')
    .where('id', Route.matchers.number())
  Route.post(':id/messages', 'MessagesController.postMessage')
    .middleware('auth')
    .where('id', Route.matchers.number())
}).prefix('/lessons')

// Files
Route.post('/classfiles/:id', 'FilesController.uploadFile').middleware('auth:teacher')
Route.get('/classfiles/:id', 'FilesController.getClassFiles')
