const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const cors=require('cors')
const bearertoken=require('express-bearer-token') // this will bring the token prop from req.body unto the req.token inside Auth callback 



// connection
// const mysql=require('mysql')
// const db=mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'maungapain',
//     database: 'jamboree',
//     port: '3306'
// })
// db.connect((err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log('mysql jamboree is connected')
// })


// helper crypto
// const crypto=require('crypto')
// const encrypt=(password)=>{
//     return crypto.createHmac('sha256','puri').update(password).digest('hex')
// }





const PORT=5000

app.use(cors()) // permission to all ui

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use(bearertoken())



///////////////CONTROLLERS//////////////////

app.get('/',(req,res)=>{
    return res.send('<h1>Buat data backend dimulai</h1>')
})

const {UserRouters,MenuRouters,SellerRouters,TransactionRouters} = require('./scripts/routers')

app.use('/users',UserRouters)
app.use('/menu',MenuRouters)
app.use('/sellers',SellerRouters)
app.use('/transactions',TransactionRouters)


// app.get('/sellers',(req,res)=>{
//     const {userid}=req.query

//     if(userid){
//         console.log('get seller query')
//         var sql=`select * from sellers where userid=${userid}`
//         db.query(sql,(err,result)=>{
//             if(err) return res.status(500).send(err)
//             // console.log(result[0])
//             return res.status(200).send(result[0])
//         })
//     }else{
//         var sql='select * from sellers'
//         db.query(sql,(err,result)=>{
//             if(err) return res.status(500).send(err)
//             return res.status(200).send(result)
//         })
//     }
// })

// app.post('/users',(req,res)=>{
//     const {username,password,role} = req.body
//     if(username===''||password===''||role===''){
//         return res.status(500).send({message:'data masih kurang'})
//     }
//     const newuser={
//         username,
//         password: encrypt(password),
//         role
//     }
//     var sql = 'insert into users set ?'
//     db.query(sql,newuser,(err,resultInsert)=>{
//         if(err) return res.status(500).send(err)
//         // console.log(resultInsert)
//         // return res.status(200).send(result)
//         sql = `select * from users where username='${username}'`
//         db.query(sql,(err,response)=>{
//             if(err) return res.status(500).send(err)
//             return res.status(200).send(response[0])
//         })
//     })
// })

// app.get('/users',(req,res)=>{
//     const {username,password} = req.query
//     // console.log('get users')
//     // console.log(req.query)
//     // console.log(username)
//     if(username===undefined&&password===undefined){
//         // console.log('testing no req')
//         var sql=`select * from users`
//         db.query(sql,(err,result)=>{
//             if(err) return res.status(500).send(err)
//             return res.status(200).send(result)
//         })
//     }else{
//         var sql=`select * from users where username='${username}' and password='${password}'`
//         db.query(sql,(err,result)=>{
//             if(err) return res.status(500).send(err)
//             return res.status(200).send(result)

//             // if(result.length){
//             // }else{
//             //     return res.status(500).send({message:'user not found'})
//             // }
//         })
//     }
// })

// app.get('/users/:id',(req,res)=>{
//     const {id}=req.params
//     // console.log('get user')
//     var sql=`select * from users where id=${id}`
//     db.query(sql,(err,result)=>{
//         if(err) return res.status(500).send(err)
//         // console.log(result)
//         res.status(200).send(result[0])
//     })
// })


// //// //
// MENU //
// //// //

// var sqlmenu=`select m.*,c.category_name from menu m
//     join categories c on m.categoryid=c.id
//     where isdeleted=${false}`

// app.get('/menu',(req,res)=>{
//     const {sellerid}=req.query
//     var sql=sqlmenu+` and sellerid=${sellerid}`
//     db.query(sql,(err,menu)=>{
//         if(err) return res.status(500).send(err)
//         res.status(200).send(menu)
//     })
// })

// app.post('/menu',(req,res)=>{
//     console.log(req.body)
//     var sql=`insert into menu set ?`
//     db.query(sql,req.body,(err,added)=>{
//         if(err) return res.status(500).send(err)
//         // res.status(200).send(added)
//         // sql=`select * from menu`
//         db.query(sqlmenu,(err,menu)=>{
//             if(err) return res.status(500).send(err)
//             res.status(200).send(menu)
//         })
//     })
// })

// app.put('/menu/:id',(req,res)=>{
//     console.log('edit menu')
//     const {id}=req.params
//     console.log(req.body)
//     console.log(id)
//     var sql=`update menu set ? where id=${id}`
//     db.query(sql,req.body,(err,updated)=>{
//         if(err) return res.status(500).send(err)
//         console.log('berhasil')
//         // sql=`select * from menu`
//         db.query(sqlmenu,(err,menu)=>{
//             if(err) return res.status(500).send(err)
//             res.status(200).send(menu)
//         })
//     })
// })

// app.delete('/menu/:id',(req,res)=>{
//     console.log('delete menu')
//     const {id}=req.params
//     var sql=`update menu set ? where id=${id}`
//     db.query(sql,{isdeleted:true},(err,deleted)=>{
//         if(err) return res.status(500).send(err)
//         console.log('deleted')
//         db.query(sqlmenu,(err,menu)=>{
//             if(err) return res.status(500).send(err)
//             res.status(200).send(menu)
//         })
//     })
// })

// app.get('/categories',(req,res)=>{
//     var sql=`select * from categories`
//     db.query(sql,(err,result)=>{
//         if(err) return res.status(500).send(err)
//         res.status(200).send(result)
//     })
// })



app.listen(PORT,()=>console.log('Server online at port '+PORT))


