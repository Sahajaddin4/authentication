 const User=require('../models/userModel');
 const bcrypt=require('bcrypt');
exports.signup=async(req,res)=>{
    const{name,role,email,password}=req.body;
   
    
   try {
     //check if user already exist
     const user=await User.findOne({email});

     if(user)
     {
         return res.status(400).json({
            success:false,
             message:'user already exists',
         })
     }
 
     //if user not present
     
     //encrypt password
     
      let hashedPassword=await  bcrypt.hash(password,10);
     const newUser=new User({
         name,
         role,
         email,
         password:hashedPassword
     });
    
    
     await newUser.save();
     return  res.status(200).json({
         suceess:true,
         message:'user added successfully'
         
     })
   } 
   
   catch (error) {
    return  res.status(500).json({
        suceess:false,
        message:'internal server error'  
    })
   }
}