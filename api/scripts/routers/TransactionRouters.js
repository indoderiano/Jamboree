const Express=require('express')
const {TransactionControllers}=require('../controllers')

const Route=Express.Router()

// Route.post('/',UserControllers.register)
Route.post('/',TransactionControllers.addToBag)
Route.get('/',TransactionControllers.acquire)
Route.get('/transactiondetails',TransactionControllers.getTransactionDetails)
Route.put('/transactiondetails/:id',TransactionControllers.editItemOnBag)

module.exports=Route

