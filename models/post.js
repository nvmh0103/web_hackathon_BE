
const { ObjectId } = require('bson');
const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    nguoiPost:{
        type: ObjectId,
    },
    moTa:{
        type: String,
    },
    likes:{
        type: Number,
    },
    comments:[{
        comment:{
            type: ObjectId,
        },
    }],
    videoLinkPath:{
        type: String,
    },
    pictureLinkPath:{
        type: String,
    },

},{
    timestamps:true,
})



const Post= mongoose.model('Post',postSchema);
module.exports = Post;