const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv")
const { connection } = require('./config/db')
const { routerpost } = require('./router/posts')
const { userRouterPost } = require('./router/users')



const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('Hay! dont worry i can do it')
})

app.use("/posts",routerpost)
app.use('/user', userRouterPost)


app.listen(PORT, async ()=>{
    try{
        await connection
        console.log("connected to mongodb")
    }catch(e){
        console.log(e)
    }
    console.log('Port Running on http//localhost:'+PORT)
})