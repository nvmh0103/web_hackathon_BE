const express= require('express');
const router= new express.Router();
const auth=require('../middlewares/auth');
const authGv= require('../middlewares/authGv');
const groupController=require('../controllers/groupController');

// Create group
router.post('/groups',authGv,groupController.createGroup);

router.post('/groups/member',auth,groupController.addMember);

router.get('/groups/allMember',groupController.getAllMember);

router.get('/groups',groupController.getAllGroup);

// router.post('/groups/postHs',auth,groupController.addPostHs);

// router.post('/groups/postGv',authGv,groupController.addPostGv);

module.exports=router;
