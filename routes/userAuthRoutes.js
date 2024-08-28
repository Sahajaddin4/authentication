const router=require('express').Router();
const {signup, userLogin}=require('../controller/userAuthController');
const { auth,isStudent, isAdmin } = require('../middlewares/auth');

router.post('/signup',signup);
router.post('/login', userLogin);

//middlewares 
router.get('/student',auth,isStudent,(req,res)=>{
     res.status(200).json({
        success:true,
        message:"Welcome to  student dashboard.."
    });
})

router.get('/admin', auth, isAdmin, (req, res)=> {
    res.status(200).json({
        success:true,
        message:"Welcome to  Admin dashboard.."
    });
})
///export router
module.exports=router