const {db} = require('../connections')

module.exports={
    register:(req,res)=>{
        console.log('registering seller...')
        console.log(req.body)
        var sql=`insert into sellers set ?`
        db.query(sql,req.body,(err,registered)=>{
            if(err) return res.status(500).send(err)
            console.log('store is registered')
            return res.status(200).send(registered)
        })
    },

    acquire:(req,res)=>{
        console.log('obtaining seller data')
        const {userid}=req.query
    
        if(userid){
            // console.log('sending seller data')
            var sql=`select * from sellers where userid=${userid}`
            db.query(sql,(err,result)=>{
                if(err) return res.status(500).send(err)
                console.log('sending seller data success')
                console.log('')
                return res.status(200).send(result[0])
            })
        }else{
            // console.log('sending seller list')
            var sql='select * from sellers'
            db.query(sql,(err,result)=>{
                if(err) return res.status(500).send(err)
                console.log('sending seller list data success')
                console.log('')
                return res.status(200).send(result)
            })
        }
    },

}