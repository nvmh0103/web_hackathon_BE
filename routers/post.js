const express= require('express');
const router= new express.Router();
const auth=require('../middlewares/auth');
const authGv= require('../middlewares/authGv');
const postController=require('../controllers/postController');


router.post('/posts',auth,postController.createPost);

router.post('/posts/watched',auth,postController.addWatchedStudent);

router.get('/posts',auth,postController.getAllPost)




module.exports=router;