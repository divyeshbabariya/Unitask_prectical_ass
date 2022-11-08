const authmodel = require('../model/authmodel')
const Jwt = require('jsonwebtoken');

exports.verify =async(req,res,next)=>{
    const bearerHeader = req.headers['authorization'];
     const id = req.params.id
  
        if (bearerHeader) 
        {
          const bearer = bearerHeader.split(' ');
          const bearerToken = bearer[1];          
          req.token = bearerToken;
           
          const userdata = await authmodel.findById({_id:id})
          
          console.log(".......",userdata)
          for (const iterator of userdata.token) {
            console.log("bearerToken",bearerToken)
            console.log("user",iterator.token)
                            if(bearerToken==iterator.token)
                            {
                                console.log("iterator.....",iterator.token)
                                next();
                                break;
                            } 
            }
        }
        else
        {
            res.status(403).json({
                message:"forbiddne",
                status:403
            });
        }
}




exports.userToken = async(req,res,next) =>{
    try {
      
        const token = req.params.token
        console.log("jwt",token);
        
        const verifyUser = Jwt.verify(token,"keyuri reebadiya");
        console.log(verifyUser);    
        const user = await authmodel.findOne({ _id:verifyUser.id })
        console.log("userr",user);
        req.token = token
        req.user = user
        console.log("req user",req.user);
        next()
    } catch (error) {
        res.status(401).send(error)
    }
}

