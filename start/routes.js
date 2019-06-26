'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/user', 'UserController.store').validator('User')
Route.post('/session', 'SessionController.store').validator('Session')
Route.get('/file/:id', 'FileController.show')
Route.group(() => {
  Route.post('/file', 'FileController.store').middleware('isAdmin')
  Route.resource('product', 'ProductController')
    .apiOnly()
    .middleware(new Map([[['store', 'update', 'destroy'], ['isAdmin']]]))
    .validator(new Map([[['store', 'update'], ['Product']]]))
  Route.resource('product.type', 'ProductTypeController')
    .apiOnly()
    .middleware(new Map([[['store', 'update', 'destroy'], ['isAdmin']]]))
    .validator(new Map([[['store', 'update'], ['ProductType']]]))
  Route.resource('product.type.size', 'ProductSizeController')
    .apiOnly()
    .middleware(new Map([[['store', 'update', 'destroy'], ['isAdmin']]]))
    .validator(new Map([[['store', 'update'], ['ProductSize']]]))
  Route.resource('order', 'OrderController')
    .except('store')
    .apiOnly()
    .middleware('isAdmin')
    .validator(new Map([[['update'], ['OrderUpdate']]]))
  Route.post('/user/order', 'OrderController.store')
    .middleware('isAdmin:1')
    .validator('Order')
  Route.get('/user/order', 'UserOrderController.index').middleware('isAdmin:1')
  Route.get('/session', 'SessionController.index')
}).middleware('auth')
