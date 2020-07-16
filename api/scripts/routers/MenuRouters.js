const Express=require('express')
const {MenuControllers} = require('../controllers')

const Route=Express.Router()

Route.get('/',MenuControllers.acquire)
Route.post('/',MenuControllers.create)
Route.put('/:id',MenuControllers.edit)
Route.delete('/:id',MenuControllers.delete)
Route.get('/categories',MenuControllers.category)

module.exports=Route