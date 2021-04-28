const Post= require('../models/post');


class postController{
    async createPost(req, res) {
        const post = new Post(req.body);
        try{
            post.nguoiPost=req.user.email;
            await post.save();
            console.log(post);
            res.status(200).json({message:"OK"});
        }catch (e){
            res.status(400).json({error:"something wrong happend"});
        }
    }
    async addWatchedStudent(req, res){
        const post=await Post.findById(req.body.id);

        console.log(post);
        try{
            const student=req.user.email;
            console.log(student);
            post.videosLinkPath.forEach((object) => {
                if (object.video == req.body.path){
                    object.watchedStudent= object.watchedStudent.concat({student});
                    
                }
            })
            await post.save();
            res.status(200).json({message:"Add success"});
            }
        catch(e) {
            res.status(400).json({error:"something happened"})
        }
    }
    async getAllPost(req,res){
        try{

            const allPost= await Post.find();
            res.status(200).send(allPost); 
        } catch (e){
            res.status(400).json({error:"somethign wrong happened"});
        }
    }
}

module.exports= new postController();
