const mysql=require('mysql')

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'maungapain',
    database: 'jamboree',
    port: '3306'
})
db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('mysql jamboree is connected')
})

module.exports=db