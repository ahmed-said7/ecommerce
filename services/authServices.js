let expressHanler=require('express-async-handler');
let userModel=require('../models/userModel');
let {Op}=require('sequelize');
const apiError = require('../utils/apiError');
let bcryptjs=require('bcryptjs');
let jwt=require('jsonwebtoken');
require('dotenv').config();

let login=expressHanler(async(req,res,next)=>{
    let {username ,password,email} = req.body;
    let user=await userModel.findOne(
        { where :
        {[Op.or]:[{ email : email || ""} ,{ username: username || "" }]}
        });
    if(!user){
        return next(new apiError('no user found',400));
    };
    let valid=await bcryptjs.compare(password,user.password);
    if(!valid){
        return next(new apiError('password mismatch',400));
    };
    let token=jwt.sign({userId:user.id},
        process.env.JWTSECRET,
        {expiresIn:'4d'});
    res.status(200).json({token});
});



let protected=expressHanler(async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    };
    
    let decoded=jwt.verify(token,process.env.JWTSECRET);
    
    let user=await userModel.findByPk(decoded.userId);
    if(!user){
        return next(new apiError('Invalid token',400));
    };

    req.user=user;

    next();

});



let forgetPassword=expressHanler(async(req,res,next)=>{
    
    let {email,username} = req.body;
    let user=await userModel.findOne(
        { where :
        {[Op.or]:[{ email : email || ""} ,{ username: username || "" }]}
        });
    if(!user){
        return next(new apiError('no user found',400));
    };
    let resetCode=`${Math.floor(100000 + Math.random() * 900000)}`;

    user.passwordResetCode=await bcryptjs.hash(resetCode,10);
    user.passwordResetCodeExpiresAt=Date.now()+20*60*1000;
    user.passwordResetCodeVerification=false;
    
    let options={
        from:'e-shop',
        to:user.email,
        message:`your verification code to change password is ${resetCode}`,
        subject:'change your password'
    };
    
    try{
        await require('../utils/sendMail').sendMail(options);
    }catch(e){
        console.log(e);
        user.passwordResetCode=undefined;
        user.passwordResetCodeExpiresAt=undefined;
        user.passwordResetCodeVerification=undefined;
    };
    
    await user.save();
    
    res.status(200).json({status: 'success'});
    
});



let vertifyPassword=expressHanler(async (req,res,next)=>{

    let {email,username,resetCode} = req.body;
    
    let user=await userModel.findOne(
        { where :
        {[Op.or]:[{ email : email || ""} ,{ username: username || "" }]}
        });
    
    if(!user){
        return next(new apiError('no user found',400));
    };
    
    if(user.passwordResetCodeExpiresAt>Date.now()){
        return next(new apiError('reset code expired',400));
    };

    let valid=await bcryptjs.compare(resetCode,user.passwordResetCode);
    
    if(!valid){
        return next(new apiError('reset code',400));
    };
    
    user.passwordResetCode=undefined;
    user.passwordResetCodeExpiresAt=undefined;
    user.passwordResetCodeVerification=true;

    await user.save();
    res.status(200).json({status: 'success'});

});



let changePassword=expressHanler(async (req,res,next)=>{

    let {email,username,password} = req.body;
    
    let user=await userModel.findOne(
    { 
        where :
        {[Op.or]:[{ email : email || ""} ,{ username: username || "" }]}
    });
    
    if(!user){
        return next(new apiError('no user found',400));
    };
    
    if(!user.passwordResetCodeVerification){
        return next(new apiError('reset code is not vertified',400));
    };

    user.passwordResetCodeVerification=undefined;
    user.password=await bcryptjs.hash(password,10);
    await user.save();

    res.status(200).json({status: 'success'});

});



let allowedTo=(...roles)=>{
    return expressHanler(async(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new apiError('you are not allowed to access',400));
        };
        next();
    });
};



let signup=expressHanler(async(req,res,next)=>{
    
    let user=await userModel.create(req.body);
    
    if(!user){
        return next(new apiError('can not create user',400));
    };
    let token=jwt.sign({userId:user.id},
        process.env.JWTSECRET,
        {expiresIn:'4d'});
    
    res.status(200).json({token});
    
});

module.exports={protected,login,signup,allowedTo
    ,changePassword,vertifyPassword,forgetPassword};