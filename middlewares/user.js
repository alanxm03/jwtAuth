const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

let auth = (req,res,next)=>{
    try{

        let token = req.headers.authorization
        console.log(token);
        let decoded = jwt.verify(token, 'openHello');
        if(decoded){
            userModel.findOne({"_id":decoded.data._id})
            .then(data=>{
                if(data){
                    next()
                }
                else{
                    res.status(401).json({"message":"unathorized"})
                }
            })
            .catch(e=>{
                    res.status(401).json({ "message": "unathorized" });
            })
        }
        else{
            res.status(401).json({ message: "unathorized" });
        }
    }
    catch(e){
        res.status(500).json({ message: e });
    }
}


let middleware2 = (req, res, next) => {
  console.log("middleware called");
  next();
};

module.exports = { auth, middleware2 };