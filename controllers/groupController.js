const Group= require('../models/group');
const User = require('../models/user');


class groupController{
    async createGroup(req, res){
        const group= new Group(req.body);
        try{
            await group.save();
            res.status(200).json({message: "Create successfully!"})
        } catch (e){
            res.status(400).json({message:"something wrong happend!"});
        }
    }
    async addMember(req, res){
        const group= await Group.findOne({ten: req.body.ten});
        const email=req.body.email;
        group.users=group.users.concat({email});
        try{
            await group.save();
            res.status(200).json({message: "Add successfully!"})
        } catch (e){
            res.status(400).json({message:"something wrong happend!"});
        }
    }

    async getAllMember(req, res){
        const group= await Group.findOne({ten: req.body.ten});
        var userMap=[];
        try{
            if (!group){
                res.status(404).json({message:"group not found!"});
            }
            
            group.users.forEach(async (member) => {
                
                const user= await User.findOne({email:member.email});
                console.log(user);
                userMap.push(user);
            })
            console.log(userMap);
            res.status(200).send(JSON.stringify(userMap));
        } catch (e){
            res.status(400).json({message:"erorr"});
        }
    }
}

module.exports= new groupController();