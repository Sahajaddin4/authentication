 const User=require('../models/userModel');
 const bcrypt=require('bcrypt');
 const jwt = require('jsonwebtoken')
 require("dotenv").config();


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

exports.userLogin=async(req, res)=>{
    try{
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                status: false,
                message: "Please Carefully Enter your Details"
            })
        }

        // does user exist
        let user = await User.findOne({email});
        if(!user){
            res.status(400).json({
                success: true,
                message: "Please SignUp first"
            })
        }

        // Create payload for JWT
        const payload ={
            email: user.email,
            id : user.id,
            role: user.role
        }

        // Matching password
        if(await bcrypt.compare(password, user.password)){

            // Creating token
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });


            user = user.toObject();
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true,
            }

            // res.cookie("token",token,options).status(200).json({
            //     success : true,
            //     token,
            //     user,
            //     message:"User logged in successfully"
            // });

            res.status(200).json({
                status: true,
                token,
                user,
                message: "Login Successfully"
            });


        }
        else {
            // password not match
            return res.status(403).json({
                success : false,
                message : "Password does not match",
            })
        }
    }
    catch(e){
        return res.status(500).json({
            success: false,
            message: e.message,
        })
    }
}