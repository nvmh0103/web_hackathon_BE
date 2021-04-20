const User= require('../models/user');

class userController{
    //create user
    async createUser(req, res) {
        const user=new User(req.body);

    try {
        await user.save();
        const token= await user.generateAuthToken();
        res.status(201).send( { user, token});
        }
    catch (e) {
    res.status(400).send(e);
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