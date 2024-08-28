const router=require('express').Router();
const {signup, userLogin}=require('../controller/userAuthController');
const { auth,isStudent } = require('../middlewares/auth');

router.post('/signup',signup);
router.post('/login', userLogin);



//middlewares 
router.get('/student',auth,isStudent,(req,res)=>{
     res.status(200).json({
        success:false,
        message:"Welcome to  student dashboard.."
    });
})
///export router
module.exports=router