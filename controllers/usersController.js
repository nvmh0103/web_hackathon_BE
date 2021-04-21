const User= require('../models/user');
const nodeMailer=require('nodemailer');
const sendEmail=require('../utils/email/sendEmail')
const jwt=require('jsonwebtoken');
class userController{
    //create user
    async createUser(req, res) {
        const user=new User(req.body);

    try {
        await user.save();
        const token= await user.generateAuthToken();
        const verifyToken=jwt.sign({ email: user.email },'thisisme',{expiresIn:'20m'});
        const link=`localhost:3000/verify/${verifyToken}`
        sendEmail(
            user.email,
            "Verify your account for social study",
            {
                name: user.hoTen,
                link: link,
            },
            "./template/accountActivation.handlebars"
        )
        res.status(200).json({message:"Please verify your account"});
        }
        catch (e) {
            res.status(400).send(e);
        }
    }

    // verify user
    async verify(req, res){
        try{

            const token= req.body.token;
            if (token){
                jwt.verify(token,'thisisme',async(err, decodedToken) => {
                    if (err){
                        return res.status(400).json({error: "Incorect or Expired link"});
                    }
                    const {email}=decodedToken;
                    const user= await User.findOne({email});
                    user.isVerify=true;
                    await user.save();
                })
            res.status(201).json({message: "Verify success"});
            }
        } catch (e){
            res.status(400).json({error: "something wrong happened!"});
        }
    }

    //login
    async loginUser(req, res){
        try {
            const user= await User.findByCredentials(req.body.email, req.body.matKhau);
            const token= await user.generateAuthToken();
            res.send({
                user,
                token,
            });
        } catch (e) {
            res.status(400).send(e);
        }
    }

    //get profile
    async getProfile(req, res){
        res.send(req.user);
    }

    //logout
    async logOut(req, res){
        try{
            req.user.tokens= req.user.tokens.filter( (token) => {
                return token.token !== req.token;
            })
    
            await req.user.save();
    
            res.send();
        } catch (e) {
            res.status(500).send();
        }
    }
    //delete
    async deleteUser( req, res){
        try {
            await req.user.remove();
            res.send(req.user);
        } catch (e) {
            res.status(500).send(e);
        }
    }
    //change user
    async changeUser( req, res){
        const updates=Object.keys(req.body);
        const allowedUpdates=['taiKhoan', 'email', 'matKhau', 'soDt','maLop','hoTen'];
        const isValidOperation= updates.every( (update)=>{
            return allowedUpdates.includes(update);
            })

    if (!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!'});
    }
    try {

        updates.forEach( (update) => {
            req.user[update] = req.body[update];
        })
        await req.user.save();
        res.send(req.user);
    } catch(e) {
        res.status(400).send(e);
        }
    }
}

module.exports = new userController();