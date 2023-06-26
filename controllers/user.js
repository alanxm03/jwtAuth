const routes=require('express').Router()
const userModel=require('../models/user')
var jwt = require('jsonwebtoken');
const {auth}=require('../middlewares/user')


//route to get user email and password

routes.post('/',(req,res)=>{
    //data saving
    let data={
        "email":req.body.email,
        "password":req.body.password
    }
    console.log(req.body);
    let saveUser=new userModel(data)
    saveUser.save(err=>{
        if(err){
            res.status(500).json({"message":err})
            console.log(err)
        }
        else{
            res.status(200).json({"message":"Saved to Db"})
        }
    })
})
routes.get("/view",(req,res)=>{
    //viewing and making token
    userModel.findOne({"email":req.query.email})
    .then(data=>{
        if(data){
        var token = jwt.sign({data: data }, 'openHello');
        res.status(200).json({ status: true, message: token });
        console.log(token);
        }
        else{
            res.status(204).json({ status: false, message: "username or password incorrect" })
        }
    })
    .catch((e) => {
        console.log(e);
      });
    
})
routes.get("/viewme",auth,(req, res) => {
    userModel
      .findOne({ "email": req.query.email })
      .then((data) =>{
          if(data){
            res.status(200).json({ Message:"Login Successful" })
          }
          else
          {
              res.status(500).json({message:"Invalid User"})
          }
      })
      
  });


routes.post('/getTokenDecoded',(req,res)=>{
    let token= req.body.token;
    // calling the function decodeToken and storing it in a variable
    // var tokenDisplay=decodeToken(token);
    // res.status(200).json({data:tokenDisplay})
    var decoded = jwt.verify(token, 'openHello');
    console.log(decoded.data)
    res.status(200).json({data:decoded})

})
//using the decode method in function decodeToken
function decodeToken(token) {
    var decoded = jwt.verify(token, 'openHello');
    console.log(decoded)
    return decoded
    
}




module.exports= routes