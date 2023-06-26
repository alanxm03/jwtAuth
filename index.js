const express=require('express')
const app=express()
app.use(express.urlencoded({extended:true}))

const mongoose=require('mongoose')
//mongodb connection
const DB_URL="mongodb://127.0.0.1:27017/"
const DB_NAME="auth"
mongoose.set('strictQuery', true);


mongoose.connect(DB_URL + DB_NAME,{
    useNewUrlparser:true,
    useUnifiedTopology:true,
})
.then(() => {
    // Connection successful
    console.log('Connected to MongoDB');
    // Continue with your database operations
  })
  .catch((error) => {
    // Connection error
    console.error('Error connecting to MongoDB:', error);
  });
//end of db connection
const user=require('./routes/user')
app.use('/user',user)

app.listen(3000,()=>{
    console.log("Listening to port 3000");
})

