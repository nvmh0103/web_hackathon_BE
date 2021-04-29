const User= require('../models/user');
const nodeMailer=require('nodemailer');
const sendEmail=require('../utils/email/sendEmail')
const jwt=require('jsonwebtoken');
const crypto=require('crypto');
const bcrypt=require('bcryptjs');
class userController{
    //create user
    async createUser(req, res) {
        const user=new User(req.body);

    try {
        await user.save();
        const token= await user.generateAuthToken();
        const verifyToken=jwt.sign({ email: user.email },'thisisme',{expiresIn:'20m'});
        const link=`/verify/${verifyToken}`
        sendEmail(
            user.email,
            "Verify your account for social study",
            {
                name: user.hoTen,
                link: link,
            },
            "./template/accountActivation.handlebars"
        )
        res.status(200).json({message:"Please verify your account",token});
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
                       throw new Error("Expired or wrong token!");
                    }
                    const {email}=decodedToken;
                    const user= await User.findOne({email});
                    user.isVerify=true;
                    await user.save();
                })
            res.status(201).json({message: "Verify success"});
            }
        } catch (e){
            res.status(400).send(e);
        }
    }
    //forget password
    async forgetPassword(req, res){
        try{
            const user= await User.findOne({email: req.body.email});
            if (!user){
                throw new Error("not found user!");
            }
            user.tokens=[];
            const resetToken=crypto.randomBytes(32).toString("hex");
            console.log("here");
            const hash=await bcrypt.hash(resetToken,8);
            const token=jwt.sign({email: user.email, resetLink: hash},'thisisme',{expiresIn:'20m'});
            user.resetLink=hash;
            const link=`/forgetPassword/${token}`;
            sendEmail(
                user.email,
                "Reset your password",
                {
                    name: user.hoTen,
                    link: link,
                },
                "./template/requestResetPassword.handlebars"
            )
            await user.save();
            res.status(200).json({message:"Please check your mail for reset link!"});
        } catch (e){
            res.status(400).send(e);
        }
    }
    // reset password
    async resetPassword(req, res){
        try{

            const token= req.body.token;
            if (token){
                jwt.verify(token,'thisisme',async(err, decodedToken) => {
                    if (err){
                        return res.status(400).json({error: "Incorect or Expired link"});
                    }
                    const {email, resetLink}=decodedToken;
                    const user= await User.findOne({email});
                    const isMatch=bcrypt.compare(user.resetLink, resetLink);
                    if (!isMatch){
                        throw new Error("Token is wrong or expired!");
                    }
                    user.matKhau=req.body.matKhau;
                    await user.save();
                    res.status(200).json({message:"Success"});
                })
            }
        } catch(e){
            res.status(400).send(e);
            }
    }
    //login
    async loginUser(req, res){
        try {
            const user= await User.findByCredentials(req.body.taiKhoan, req.body.matKhau);
            const token= await user.generateAuthToken();
            res.status(200).json({message: "Logged in!",token});
        } catch (e) {
            res.status(400).json({error: "Cant login!"});
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
    
            res.status(200).json({message: "logged out!"});
        } catch (e) {
            res.status(500).json({message: "something wrong happend!"});
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
    async getGroup(req, res){
        res.status(200).send(req.user.joinedGroup);
    }
}

module.exports = new userController();