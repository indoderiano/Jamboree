const {db}=require('../connections')

const sqlmenu=`select m.*,c.category_name from menu m
    join categories c on m.categoryid=c.id
    where isdeleted=${false}`

module.exports={
    acquire:(req,res)=>{
        console.log('obtaining menu')
        console.log('sending menu list data')
        const {sellerid}=req.query
        var sql=sqlmenu+` and sellerid=${sellerid}`
        db.query(sql,(err,menu)=>{
            if(err) return res.status(500).send(err)
            console.log('sending data success')
            console.log('')
            res.status(200).send(menu)
        })
    },

    create:(req,res)=>{
        console.log('create menu')
        // console.log(req.body)
        var sql=`insert into menu set ?`
        db.query(sql,req.body,(err,added)=>{
            if(err) return res.status(500).send(err)
            // res.status(200).send(added)
            // sql=`select * from menu`
            console.log('create menu success')
            console.log('sending menu list data')
            var sql=sqlmenu+` and sellerid=${req.body.sellerid}`
            db.query(sql,(err,menu)=>{
                if(err) return res.status(500).send(err)
                console.log('sending data success')
                console.log('')
                res.status(200).send(menu)
            })
        })
    },
    
    edit:(req,res)=>{
        console.log('edit menu')
        const {id}=req.params
        // console.log(req.body)
        // console.log(id)
        var sql=`update menu set ? where id=${id}`
        db.query(sql,req.body,(err,updated)=>{
            if(err) return res.status(500).send(err)
            console.log('edit menu success')
            console.log('sending menu list data')
            // sql=`select * from menu`
            var sql=sqlmenu+` and sellerid=${req.body.sellerid}`
            db.query(sql,(err,menu)=>{
                if(err) return res.status(500).send(err)
                console.log('sending data success')
                console.log('')
                res.status(200).send(menu)
            })
        })
    },
    
    delete:(req,res)=>{
        console.log('delete menu')
        const {id}=req.params
        var sql=`update menu set ? where id=${id}`
        db.query(sql,{isdeleted:true},(err,deleted)=>{
            if(err) return res.status(500).send(err)
            console.log('menu is deleted')
            console.log('')
            // console.log('sending menu list data')
            // db.query(sqlmenu,(err,menu)=>{
            //     if(err) return res.status(500).send(err)
            //     console.log('sending data success')
            //     res.status(200).send(menu)
            // })
            res.status(200).send(deleted)
        })
    },
    
    category:(req,res)=>{
        console.log('acquire category list')
        var sql=`select * from categories`
        db.query(sql,(err,result)=>{
            if(err) return res.status(500).send(err)
            console.log('success')
            console.log('')
            res.status(200).send(result)
        })
    },

}