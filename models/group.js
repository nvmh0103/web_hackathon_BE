
const { ObjectId } = require('bson');
const mongoose=require('mongoose');

const groupSchema=new mongoose.Schema({
    ten:{
        type:String,
        required: true,
        trim:true,
    },
    nguoiTao:{
        type: String,
    },
    users:[{
        user:{
            type: ObjectId,
        }
    }]

},{
    timestamps:true,
})



const Group= mongoose.model('Group',groupSchema);
module.exports = Group;
