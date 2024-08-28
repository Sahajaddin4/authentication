const router=require('express').Router();
const {signup, userLogin}=require('../controller/userAuthController');

router.post('/signup',signup);
router.post('/login', userLogin)
///export router
module.exports=router