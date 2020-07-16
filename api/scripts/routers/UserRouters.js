const Express=require('express')
const {UserControllers}=require('../controllers')
const {Auth}=require('../supports/Auth')

const Route=Express.Router()

Route.post('/',UserControllers.register)
Route.get('/keeplogin',Auth,UserControllers.acquire)
Route.get('/',UserControllers.check)
Route.put('/verify',Auth,UserControllers.verify)
Route.post('/resend',Auth,UserControllers.resendMail)

module.exports=Route