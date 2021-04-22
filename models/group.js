
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

},{
    timestamps:true,
})



const Group= mongoose.model('Group',groupSchema);
module.exports = Group;
