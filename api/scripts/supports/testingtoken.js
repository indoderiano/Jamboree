console.log('testing token')



const jwt = require ('jsonwebtoken');
const data = {id:3}
const data2 = {id:20,username:'test'}
const token = jwt.sign(data, "puripuriprisoner", { expiresIn : '12h' })
const token2 = jwt.sign(data2, "shifu", { expiresIn : '5000' })
const token3 = jwt.sign({id:2},"shifu",{ expiresIn: '12h' })

// console.log(token2)

var tokenid='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTEwMjQ3NTYsImV4cCI6MTU5MTExMTE1Nn0.PqOoc7NVa-fyd1vHVQwoWLIPIXykWFZA1CjLsKnxjvM'


setTimeout(()=>{
    
    jwt.verify(token3, "shifu", (error, decoded) => {
        if (error) {
            console.log('verify fail')
            // return res.status(401).json({ message: "User not authorized.", error: "User not authorized." });
        }else{
            console.log(decoded)
        }
            // next();
    });

},4000)
