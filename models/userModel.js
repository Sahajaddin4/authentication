const mongoose=require('mongoose');

//Schema define for user
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Student","Normal"],
        required:true
    }
});

module.exports=mongoose.model('User',userSchema);