const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/justforprectice")
.then(()=>{
    console.log("connection successfully...");
})
.catch((err)=>{
    console.log("connection failed");
})