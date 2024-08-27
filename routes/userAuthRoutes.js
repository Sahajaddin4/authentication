const router=require('express').Router();
const {signup}=require('../controller/userAuthController');

router.post('/signup',signup);

///export router
module.exports=router