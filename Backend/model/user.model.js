import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerfied:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,
},{
    timestamps:true  //created at updated at automaticaly added
});


const User = mongoose.model('user', userSchema)

export default User