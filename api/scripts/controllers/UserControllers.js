const {db}=require('../connections')
const encrypt=require('../supports/crypto')
const jwt=require('jsonwebtoken')
const transporter=require('../supports/mailer')


module.exports={
    register:(req,res)=>{
        console.log('registering...')
        const {username,password,role} = req.body
        if(username===''||password===''||role===''){
            return res.status(500).send({message:'data masih kurang'})
        }
        const newuser={
            username,
            password: encrypt(password),
            role
        }
        var sql = 'insert into users set ?'
        db.query(sql,newuser,(err,created)=>{
            if(err) return res.status(500).send(err)
            // console.log(resultInsert)
            // return res.status(200).send(result)
            console.log('sending email verification...')
            var token=jwt.sign({id:created.insertId},"shifu",{expiresIn:'24h'})
            var verificationLink=`http://localhost:3000/verification/${token}`
            // var unyu=fs.readFileSync('unyu.html','utf8')
            var maildata={
                from: 'Admin <mde50526@gmail.com>',
                to: 'mde50526@gmail.com',
                subject: 'Jamboree Verification Account',
                // html: unyu
                html: `klik untuk verifikasi account, link ini kadaluarsa dalam 24 jam: 
                <a href=${verificationLink}>verify</a>`
            }
            transporter.sendMail(maildata,(err,sent)=>{
                if(err) return res.status(500).send(err)
                
                console.log('registering success')
                console.log('sending username data...')
                sql = `select * from users where id=${created.insertId}`
                db.query(sql,(err,response)=>{
                    if(err) return res.status(500).send(err)
                    console.log('sending data success')
                    console.log('')
                    return res.status(200).send(response[0])
                })

            })
            
        })
    },
    check:(req,res)=>{
        // console.log('checking username data')
        const {username,password} = req.query
        // console.log('get users')
        // console.log(req.query)
        // console.log(username)
        if(username===undefined&&password===undefined){
            console.log('obtain all users data')
            console.log('sending data')
            // console.log('testing no req')
            var sql=`select * from users`
            db.query(sql,(err,result)=>{
                if(err) return res.status(500).send(err)
                console.log('sending data success')
                console.log('')
                return res.status(200).send(result)
            })
        }else{
            console.log('checking username data')
            console.log('inspect data')
            var hashpass=encrypt(password)
            var sql=`select * from users where username='${username}' and password='${hashpass}'`
            db.query(sql,(err,result)=>{
                if(err) return res.status(500).send(err)
                
                if(result.length){
                    console.log('creating token...')
                    var data={id:result[0].id}
                    var token=jwt.sign(data, "shifu", { expiresIn : '24h' })
                    result[0].token=token
                }
                
                console.log('sending data success')
                console.log('')
                return res.status(200).send(result)
    
                // if(result.length){
                // }else{
                //     return res.status(500).send({message:'user not found'})
                // }
            })
        }
    },
    acquire:(req,res)=>{
        console.log('acquire username data')
        // const {id}=req.params
        console.log(req.user)
        const {id}=req.user
        // console.log('get user')
        // console.log('sending data')
        var sql=`select * from users where id=${id}`
        db.query(sql,(err,result)=>{
            if(err) return res.status(500).send(err)
            // console.log(result)
            console.log('creating token...')
            var data={id:result[0].id}
            var token=jwt.sign(data, "shifu", { expiresIn : '24h' })
            result[0].token=token
            console.log('sending data success')
            console.log('')
            return res.status(200).send(result[0])
        })
    },

    resendMail:(req,res)=>{
        const {id}=req.user
        console.log('sending email verification...')
        console.log(req.user.id)
        var token=jwt.sign({id:id},"shifu",{expiresIn:'24h'})
        // var token=jwt.sign({id:id}, "shifu", { expiresIn : '24h' })
        var verificationLink=`http://localhost:3000/verification/${token}`
        // var unyu=fs.readFileSync('unyu.html','utf8')
        var maildata={
            from: 'Admin <mde50526@gmail.com>',
            to: 'mde50526@gmail.com',
            subject: 'Jamboree Verification Account',
            // html: unyu
            html: `klik untuk verifikasi account, link ini kadaluarsa dalam 24 jam: 
            <a href=${verificationLink}>verify</a>`
        }
        transporter.sendMail(maildata,(err,sent)=>{
            if(err) return res.status(500).send(err)
            console.log('email verification sent')
            console.log('')
            res.status(200).send(sent)

        })
    },

    verify:(req,res)=>{
        console.log('verifying user...')
        console.log(req.user)
        const {id}=req.user
        var sql=`update users set ? where id=${id}`
        db.query(sql,{isverified:true},(err,updated)=>{
            if(err) return res.status(500).send(err)

            sql=`select * from users where id=${id}`
            db.query(sql,(err,userdata)=>{
                if(err) return res.status(500).send(err)
                console.log('creating token...')
                var data={id:userdata[0].id}
                var token=jwt.sign(data, "shifu", { expiresIn : '24h' })
                userdata[0].token=token
                res.status(200).send(userdata[0])
            })
        })

    }

}