import User from "../model/user.model.js";
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { generateVerificationToken } from "../utils/generateVerificatioCode.js";
import generateTokenAndCookie from "../utils/generateTokenAndCookies.js";
import validator from 'validator'
import { sendVerificationEmail } from "../mailtrap/emails.js";
import { sendWelcomeEmail } from "../mailtrap/emails.js";
import { sendPasswordResetEmail } from "../mailtrap/emails.js";
import { sendRestSuccessEmail } from "../mailtrap/emails.js";

export const signUp = async(req,res)=>{
    const {email,password,name} = req.body;

   try {

    if(!validator.isEmail(email)){
       throw Error('Email is not valid') 
    }

    if(!email || !password || !name){
        throw new Error('All fields are required')
    }

    const userExist = await User.findOne({ email });

    if(userExist){
        return res.status(400).json({success:false, message:'User already exists'})
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({
        email,
        name,
        password:hashPassword,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24*60*60*1000 //24 hours
    });

    await user.save();

    generateTokenAndCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken)

    res.status(201).json({success:true, message:'User created successfully', user:{
        ...user._doc, 
        password:undefined,
    }});

   } catch (error) {
    res.status(400).json({success:false, message: error.message})
   }
}

export const verfiyEmail = async(req,res) => {
    const {code} = req.body;

    try {
      const user = await User.findOne({
        verificationToken:code,
        verificationTokenExpiresAt:{$gt:Date.now()}
      });

      if(!user){
        return res.status(400).json({success:false, message:'Invalid or expired verification code'})
      }

      user.isVerfied = true;
      user.verificationToken=undefined;
      user.verificationTokenExpiresAt=undefined;
      await user.save();

      await sendWelcomeEmail(user.email, user.name);
      
      res.status(200).json({
        success:true,
        message:'Email verified successfully',
        user:{
            ...user._doc,
            password:undefined
        }
      })
      
    } catch (error) {
        res.status(500).json({success:false, message:'Server error'})
    }
}

export const login = async(req,res)=>{
   const {email, password} = req.body;
   try {
    const user = await User.findOne({email,
        isVerfied:true,
    });

    if(!user){
        return res.status(400).json({success:false, message:'Invalid credentials'})
    }

    const isPasswordVaild = await bcrypt.compare(password, user.password);

    if(!isPasswordVaild){
        return res.status(400).json({success:false, message:'Invalid password'})
    }
    generateTokenAndCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
        success:true,
        message:'Login sucessfully',
        user:{
            ...user._doc,
            password:undefined
        }
    })
   } catch (error) {
    res.status(400).json({success:false, message:error.message})
   }
}

 export const logout = async(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({success:true, message:'Logged out successfully'})
}

export const forgotPassword = async(req,res) => {
    const {email} = req.body;

    try {
       const user = await User.findOne({email});
       
       if(!user){
        return res.status(400).json({success:false, message:'User not found'});
       }

       const resetToken = crypto.randomBytes(20).toString('hex');
       const resetTokenExpireAt = Date.now() +1 * 60 * 60 * 1000; //1 hour

       user.resetPasswordToken = resetToken;
       user.resetPasswordExpiresAt = resetTokenExpireAt;

       await user.save();

       //send email
       await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
       res.status(201).json({success:true, message:'password reset link sent to email'})
    } catch (error) {
     res.status(400).json({success:false, message:error.message}) 
    }
}

export const resetPassword = async (req,res) => {

    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt:{$gt:Date.now()},
        })

       if(!user){
        return res.status(400).json({success:false, message:'Invalid or expired token'})
       } 

       //update password
       const hashPassword = await bcrypt.hash(password, 10);
       user.password = hashPassword;
       user.resetPasswordToken= undefined;
       user.resetPasswordExpiresAt = undefined;

       await user.save();
       await sendRestSuccessEmail(user.email);
       res.status(200).json({success:true, message:'Password Reset successfuly'})
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}

export const checkAuth = async(req,res) =>{
    try {
      const user = await User.findById(req.userId).select('-password')  
      if(!user) return res.status(400).json({success:true, message:'User not found'});

      res.status(200).json({success:true, user});
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}