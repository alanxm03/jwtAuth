const express=require('express')
const app=express()
app.use(express.urlencoded({extended:true}))

const mongoose=require('mongoose')
//mongodb connection
const DB_URL="mongodb://localhost:27017/"
const DB_NAME="auth"

mongoose.connect(DB_URL + DB_NAME,{
    useNewUrlparser:true,
    useUnifiedTopology:true
})
.then(console.log("DB Connected"))
.catch(err=>console.log(err))
//end of db connection
const user=require('./routes/user')
app.use('/user',user)

app.listen(3000,()=>{
    console.log("Listening to port 3000");
})

