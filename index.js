const express=require('express');
const dbConnect = require('./config/db');
const userAuthRoutes = require('./routes/userAuthRoutes');

const app=express();

//Middleware
app.use(express.json());

//Environment variable setup
require('dotenv').config();
const PORT=process.env.PORT || 3000;

//Database connect
dbConnect();

//Mount user auth routes
app.use('/api/user',userAuthRoutes);



//default route
app.get('/',(req,res)=>{
    res.send(`<h1>This is my home page baby</h1>`);
});

//Server create 
app.listen(PORT,(err)=>{
    !err?console.log(`server connected at port ${PORT}`):console.log('Failed to create a server');
    ;
    
})