const mongoose=require('mongoose');


const userWatchSchema= new mongoose.Schema({
    user:{
        type: String,
    },
    seen:{
        type: Boolean,
    }

},{
    timestamps: true
})

const userWatch= mongoose.model( 'UserWatch', userWatchSchema);

module.exports= UserWatch;