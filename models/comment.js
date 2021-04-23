
const { ObjectId } = require('bson');
const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    nguoiTao:{
        type: ObjectId,
    },
    moTa:{
        type:String,
    },
    
},{
    timestamps:true,
})



const Comment= mongoose.model('Comment',commentSchema);
module.exports = Comment;