import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{
        required:true,
        trim:true,
        type:String,
    },
    email:{
        required:true,
        trim:true,
        type:String,
    },
    password:{
        required:true,
        trim:true,
        type:String,
    },
    isVerified:{
        default:false,
        type:Boolean,
    },
},{
    timestamps:true
})

const User = mongoose.model('user',userSchema)

export default User;