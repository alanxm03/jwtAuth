const mongoose=require('mongoose');

var adminSchema=new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('admin',adminSchema)