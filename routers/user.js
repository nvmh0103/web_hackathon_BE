const express= require('express');
const router= new express.Router();
const auth= require('../middlewares/auth');
const userController=require('../controllers/usersController')

// create user
router.post('/users', userController.createUser);

// login 
router.post('/users/login', userController.loginUser);

// user profile
router.get('/users/me', auth ,userController.getProfile);

// logout(delete token)
router.post('/users/logout', auth, userController.logOut);

// delete user
router.delete('/users/me', auth, userController.deleteUser);

// change user
router.patch('/users/me', auth,userController.changeUser);


// router.get('/users/getEmail', async(req, res) =>{
//     try {
//         const found= await User.findByEmail(req.body.email);
//         if (found)
//             res.status(200).send('Found!');
//     } catch (e){
//         res.status(404).send('Not found email');
//     }
// })


module.exports=router;