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
        if (!group){
            res.status(404).json({message:"not found!"});
            return
        }
        const email= req.user.email;
        req.user.joinedGroup=req.user.joinedGroup.concat({group: group.ten});
        await req.user.save();
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
        var emailList=[];
        try{
            if (!group){
                res.status(404).json({message:"group not found!"});
            }
            
            group.users.forEach(async (member) => {
                emailList=emailList.concat(member.email);

            })
            const user= await User.find({
                "email": { $in: emailList}
            })
            
            res.status(200).send(user);
        } catch (e){
            res.status(400).json({message:"erorr"});
        }
    }
    async getAllGroup(req, res){
        const group= await Group.find();
        try{
            if (!group){
                res.status(400).json({error: "no group"});

            }   
            res.status(200).send(group);

        } catch(e){
            res.status(400).json({error:"something happened!"})
        }
    }
}


module.exports= new groupController();