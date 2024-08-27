const mongoose=require('mongoose');

require('dotenv').config();

const url=process.env.MONGO_URL;

function dbConnect(){
    mongoose.connect(url).then(()=>{
        console.log('Database connected');
        
    }).catch((error)=>{
        console.log(error);
        
    });
}

module.exports=dbConnect;
