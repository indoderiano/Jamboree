const {db} = require('../connections')

module.exports={
    addToBag:(req,res)=>{
        console.log('adding to bag...')
        console.log(req.body)
        const {userid,menuid,quantity,message} = req.body

        // check if transaction with details menu with status oncart already exist
        var sql=`select td.*,t.userid,t.status from transactiondetails td
            join transactions t on td.transactionid=t.id
            where t.userid=${userid} and t.status='onbag' and td.menuid=${menuid}`
        db.query(sql,(err,result)=>{
            if (err) return res.status(500).send(err)
            console.log(result)
            if(result.length){
                // ALREADY EXIST
                // JUST ADD QTY & MSG
                // ALSO UPDATE ISDELETED=FALSE
                console.log('menu already on bag')
                console.log('adding qty...')
                console.log(result[0].qty)
                const {id,qty} = result[0]
                
                var updatetransactiondetail={
                    qty:qty+quantity,
                    msg:message?message:'',
                    isdeleted:false,
                    updateat: new Date()
                }
                sql=`update transactiondetails set ? where id=${id}`
                db.query(sql,updatetransactiondetail,(err,added)=>{
                    if (err) return res.status(500).send(err)
                    // ADDED SUCCESSFULL
                    console.log('adding succesful')
                    return res.status(200).send(added)
                })
            }else{
                // IF NOT EXIST
                console.log('menu is not on bag')
                // CHECK IF TRANSACTION WITH STATUS 'ON BAG' ALREADY EXIST
                sql=`select * from transactions where userid=${userid} and status='onbag'`
                db.query(sql,(err,result)=>{
                    if (err) return res.status(500).send(err)
                    if(result.length){
                        // IF TRANSACTION ALREADY EXIST
                        // CREATE TRANSACTION DETAILS WITH MENUID
                        console.log('transaction on bag already exist')
                        console.log('creating transaction details...')
                        // console.log('adding '+)
                        var newtransactiondetail={
                            transactionid:result[0].id,
                            menuid,
                            qty:quantity,
                            msg:message?message:''
                        }
                        sql=`insert into transactiondetails set ?`
                        db.query(sql,newtransactiondetail,(err,transactiondetailcreated)=>{
                            if(err) return res.status(500).send(err)
                            // SUCCESSFUL
                            console.log('successful')
                            console.log('')
                            return res.status(200).send(transactiondetailcreated)
                        })
                    }else{
                        // IF TRANSACTION DOES NOT EXIST
                        // CREATE IT
                        console.log('transaction does not exist, creating one ...')
                        var newtransaction={
                            userid,
                            status:'onbag'
                        }
                        sql=`insert into transactions set ?`
                        db.query(sql,newtransaction,(err,transactioncreated)=>{
                            if (err) return res.status(500).send(err)
                            console.log('transaction created')
                            console.log('creating transaction details...')
                            var newtransactiondetail={
                                transactionid:transactioncreated.insertId,
                                menuid,
                                qty:quantity,
                                msg:message?message:''
                            }
                            sql=`insert into transactiondetails set ?`
                            db.query(sql,newtransactiondetail,(err,transactiondetailcreated)=>{
                                if(err) return res.status(500).send(err)
                                // SUCCESSFUL
                                console.log('successful')
                                console.log('')
                                return res.status(200).send(transactiondetailcreated)
                            })
                        })
                    }
                })
            }
        })

    },
    acquire:(req,res)=>{
        console.log('finding transaction...')
        console.log(req.query)
        const {userid,status}=req.query
        var sql=`select * from transactions where userid=${userid} and status='${status}'`
        db.query(sql,(err,result)=>{
            if (err) return res.status(500).send(err)
            console.log(result)
            // sending data
            console.log('sending transaction data succesful')
            console.log('')
            return res.status(200).send(result)
            
        })
    },

    getTransactionDetails:(req,res)=>{
        console.log('obtaining transaction details...')
        console.log(req.query)
        const {transactionid}=req.query
        var sql=`select td.*,m.menu_name,m.image,m.price,s.storename from transactiondetails td
            join menu m on td.menuid=m.id
            join sellers s on m.sellerid=s.id
            where td.transactionid=${transactionid} and td.isdeleted=false`
        db.query(sql,(err,result)=>{
            if(err) return res.status(500).send(err)
            console.log('sending transaction details succesful')
            return res.status(200).send(result)
        })
    },

    editItemOnBag:(req,res)=>{
        console.log('edit item on bag')
        console.log(req.body)
        const {id}=req.params
        var update={...req.body,updateat:new Date()}
        if(update.qty===0){
            console.log('sini')
            update.isdeleted=true
        }
        var sql=`update transactiondetails set ? where id=${id}`
        db.query(sql,update,(err,updated)=>{
            if(err) return res.status(500).send(err)
            console.log('edit successful')
            console.log('')
            return res.status(200).send(updated)
        })
    }

}