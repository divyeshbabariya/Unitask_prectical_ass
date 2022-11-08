const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { isEmail } = require('validator');



const auttSchema = new mongoose.Schema({

    userName: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    token:[{
        token:{
            type:String
        }
    }]
},
{
    timestamps:true
},
{
    collection:"user"
});


auttSchema.methods.generateauthtoken = async function(){
    try{
        const token = jwt.sign({id:this._id.toString()},"keyuri reebadiya");
        console.log("...............token:",token)
        this.token = this.token.concat({token:token})
        await this.save();
        return token;
    }
    catch(error){
        console.log(error);
    }
}

module.exports=mongoose.model("auth",auttSchema);
