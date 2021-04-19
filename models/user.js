const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');



const userSchema= new mongoose.Schema({
    taiKhoan: {
        type: String,
        required: true,
        trim: true,
    },
    matKhau: {
        type: String,
        required: true,
        trim:true,
    },
    email: {
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    soDt:{
        type: String,
        required:true,
        unique: true,
        trim:true,
    },
    maLop:{
        type: String,
        required:true,
        trim:true,
    },
    maLoaiNguoiDung:{
        type: String,
    
    },
    hoTen:{
        type: String,
        required: true,
        trim: true,
    },
    tokens:[{
        token:{
            type: String,
            required: true,
        }
    }],
    avatar: {
        type: Buffer,
    }
},{
    timestamps: true,
})

// generate token
userSchema.methods.generateAuthToken= async function() {
    const user= this;
    const token= jwt.sign( { _id: user.id.toString() }, 'thisisme');

    user.tokens= user.tokens.concat( { token } );
    await user.save();
    return token;
}

// get public profile of user
userSchema.methods.toJSON= function () {
    const user= this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    
    return userObject;
}


// login
userSchema.statics.findByCredentials = async (email, password) => {
    const user= await User.findOne({ email });

    if (!user){
        throw new Error('Unable to login!');
    }
    const isMatch= await bcrypt.compare(password, user.password);

    if (!isMatch){
        throw new Error('Unable to login');
    }
    return user;
}

// hash password
userSchema.pre('save', async function(next) {
    const user=this;

    if (user.isModified('password')) {
        user.password= await bcrypt.hash(user.password,8);
    }

    next();
})

// delete user tasks when user removed
userSchema.pre('remove',async function (next) {
    const user=this;
    console.log(user.id);
    await Task.deleteMany({ owner: user.id});
    next();
})

const User= mongoose.model( 'User', userSchema);

module.exports= User;