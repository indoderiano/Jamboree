const express=require('express')
const path=require('path')
const bodyParser=require('body-parser')
const app=express()
const cors=require('cors')
const bearertoken=require('express-bearer-token') // this will bring the token prop from req.body unto the req.token inside Auth callback 


const PORT = process.env.PORT || 5000

app.use(cors()) // permission to all ui

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use(bearertoken())



///////////////CONTROLLERS//////////////////

const {UserRouters,MenuRouters,SellerRouters,TransactionRouters} = require('./api/scripts/routers')

app.use('/users',UserRouters)
app.use('/menu',MenuRouters)
app.use('/sellers',SellerRouters)
app.use('/transactions',TransactionRouters)


app.use(express.static(path.join(__dirname, '/web/build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/web/build', 'index.html'));
});



app.listen(PORT,()=>console.log('Server online at port '+PORT))


