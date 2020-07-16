const Express=require('express')
const {SellerControllers} = require('../controllers')

const Route=Express.Router()

Route.get('/',SellerControllers.acquire)
Route.post('/',SellerControllers.register)

module.exports=Route