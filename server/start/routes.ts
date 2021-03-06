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

Route
  .group(() => {
    Route.post('auth/register', 'UsersController.register')
    Route.post('auth/login', 'UsersController.login')

    Route.get('projects', 'ProjectsController.index').middleware('auth')
    Route.post('projects', 'ProjectsController.create').middleware('auth')
    Route.delete('projects/:id', 'ProjectsController.destroy').middleware('auth')
    Route.patch('projects/:id', 'ProjectsController.update').middleware('auth')

    Route.get('projects/:id/tasks', 'TasksController.index').middleware('auth')
    Route.post('projects/:id/tasks', 'TasksController.create').middleware('auth')
    
    Route.delete('tasks/:id', 'TasksController.destroy').middleware('auth')
    Route.patch('tasks/:id', 'TasksController.update').middleware('auth')
  })
  .prefix('/api')
