
const jwt=require('jsonwebtoken');
const User=require('../models/user');


const auth= async (req, res, next) =>{
    try{
        const token= req.header('Authorization').replace('Bearer', '').trim();
        const decoded= jwt.verify(token, 'thisisme');
        const user= await User.findOne( { _id: decoded._id, 'tokens.token': token});
        if (!user){
            throw new Error();
        }
        if (user.role != "gv"){
            throw new Error();
        }
        req.token=token;
        req.user= user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Not authorize'});
    }

}

module.exports=auth;