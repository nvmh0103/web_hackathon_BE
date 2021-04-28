
const { ObjectId } = require('bson');
const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    nguoiPost:{
        type: String,
        required: true,
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
    videosLinkPath:[{
        video:{
            type: String,

        },
        watchedStudent:[{
          student:{
              type: String,
          }  
        }]
    }],
    pictureLinkPath:{
        type: String,
    },
    pdfLinkPath:[{
        pdf:{
            type: String,
        },
        watchtedStudent:[{
            student:{
                type: String,
            }
        }
        ]
    }]

},{
    timestamps:true,
})



const Post= mongoose.model('Post',postSchema);
module.exports = Post;