import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import transporter from '../config/nodemailer.js';

export const register  = async (req, res)=>{

    const {name , email , password} = req.body;

    if(!name || !email || !password){
        return res.json({success:false, message:'missing details'})
    }
    try {
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.json({success:false , message:'user already exists'})
        }

        const hashedPassword = await bcrypt.hash(password,10);
        
        const user = new userModel({name , email , password:hashedPassword});
        
        await user.save();
        //creatign a token
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET , {expiresIn:'7d'});

        res.cookie('token', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV ==='production',
            sameSite: process.env.NODE_ENV === 'production'? 'none':'strict',
            maxAge: 7*24*60*60*1000
        })
        //sending welcome wmail
        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:'welcome to auth totorial',
            text:`welcome to mayank's auth tutorial.yoir account has been created with email id:${email}`
        }
        await transporter.sendMail(mailOptions);

        res.json({success:true})  

    } catch (error) {
        return res.json({success:false, message:'error jahata'})
    }
}

export const login = async (req, res) =>{
    const {email , password} = req.body;

    if(!email || !password){
        return res.json({success:false,message:'email and password are required'});
    }

    try {
        
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:'invalid email'})
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success:false, message:'invalid password'});
        }
        
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET , {expiresIn:'7d'});

        res.cookie('token', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV ==='production',
            sameSite: process.env.NODE_ENV === 'production'? 'none':'strict',
            maxAge: 7*24*60*60*1000
        })
        
        res.json({success:true})

    } catch (error) {
        return res.json({success:false})
    }
}

export const logout = async (req, res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure: process.env.NODE_ENV ==='production',
            sameSite: process.env.NODE_ENV === 'production'? 'none':'strict',
            maxAge: 7*24*60*60*1000
        })

        return res.json({success:true, message:'loggedout'})
    } catch (error) {
        return res.json({success:false , message:error.message})
    }
}

//send verification otp to senders email
export const sendVerifyOtp = async (req,res)=>{

    try {
        
        // const {userId} = req.body;
        const userId = req.user.id;
        const user = await userModel.findById(userId);

        if(user.isAcccountVerified){
            return res.json({success:false, message:'account already verified'})
        }

        const otp = String(Math.floor(100000 + Math.random()*900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24*60*60*1000;

        await user.save();

        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to: user.email,
            subject:'Account verification OTP',
            text:`your otp is ${otp}`
        }
        await transporter.sendMail(mailOptions);
        


        res.json({success:true})  



    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

export const verifyEmail = async (req, res)=>{

    const {otp} = req.body;
    const userId = req.user.id;

    if(!userId || !otp){
        return res.json({success:false, message:'missing details'})
    }

    try {
        
        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success:false, message:'account not found'});
        }

        if(user.verifyOtp ==='' || user.verifyOtp !== otp){
             return res.json({success:false, message:'invalid otp'});
        }
        
        if(user.verifyOtpExpireAt < Date.now()){
             return res.json({success:false, message:'Otp expired'})
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

         return res.json({success:true, message:'account verified'})

    } catch (error) {
         return res.json({success:false})
    }
}

// check if user is authenticated
export const isAuthenticated = async (req , res)=>{
    try {

        return res.json({success:true});
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

//send password reset otp
export const sendResetOtp = async (req,res)=>{
    const {email} = req.body;

    if(!email){
        return res.json({success:false , message:'email is required'})
    }
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false , message:'user not found'});
        }

        const otp = String(Math.floor(100000 + Math.random()*900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 24*60*60*1000;

        await user.save();

        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to: user.email,
            subject:'Account verification OTP',
            text:`your otp is ${otp}`
        }
        await transporter.sendMail(mailOptions);
        


        res.json({success:true, message:'otp sedn to your email'})  

    } catch (error) {
        return res.json({success:false , message:error.message})
    }
}


//resete user password
export const resetPassword = async (req, res) =>{
    const {email ,otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success:false , message:error.message})
    }
    try {

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false , message:'user not found'})
        }
        
        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({success:false , message:'invalid otp'})
        }

        if(user.resetOtpExpireAt<Date.now()){
            return res.json({success:false , message:'otp expired'})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({success:true , message:'password reseted'})
        
    } catch (error) {
        return res.json({success:false , message:error.message})
    }
}