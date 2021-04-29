const express= require('express');
const router= new express.Router();
const auth= require('../middlewares/auth');
const questionController=require('../controllers/questionController');


router.post('/questions',auth,questionController.createDe);

router.get('/getDe',auth,questionController.getDe);

router.get('/getMark',auth,questionController.getMark);

module.exports= router;
