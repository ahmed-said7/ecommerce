let userModel=require('../models/userModel');
const apiError = require('../utils/apiError');
let bcryptjs=require('bcryptjs');


let {createDoc,getDoc,deleteDoc,updateDoc,getDocs} 
    = require('../utils/factory');

let expressHandler=require('express-async-handler');

let createUser=createDoc(userModel);
let getUser=getDoc(userModel);
let deleteUser=deleteDoc(userModel);
let updateUser=updateDoc(userModel);
let getUsers=getDocs(userModel);

let resizeSingleImage=expressHandler(async(req,res,next)=>{
    if(req.file){
        let filename=`user-${Date.now()}-${uuid.v4()}.jpeg`;
        req.body.image=filename;
        
        await sharp(req.file.buffer).resize(600,600).toFormat('jpeg')
        .jpeg({quality:90}).toFile(`uploads/user/${filename}`);
    };
    next();
});


let getLoggedUser=expressHandler(async (req, res, next) => {
    res.status(200).json({user:req.user});
});

let deleteLoggedUser=expressHandler(async (req, res, next) => {
    let user=await userModel.destroy({where:{id:req.user.id}});
    if(!user){
        return next(new apiError('User not found',400));
    };
    res.status(200).json({status:"success"});
});

let updateLoggedUser=expressHandler(async (req, res, next) => {
    let [user]=await userModel.update(req.body,{where:{id:req.user.id}});
    if(!user){
        return next(new apiError('User not found',400));
    };
    res.status(200).json({status:"success"});
});

let updateLoggedUserPassword=expressHandler(async (req, res, next) => {
    let {password}=req.body;
    password=await bcryptjs.hash(password,10);
    let [user]=await userModel.update({
        password,passwordChangedAt:Date.now()
    },{where:{id:req.user.id}});
    if(!user){
        return next(new apiError('User not found',400));
    };
    res.status(200).json({status:"success"});
});

module.exports={createUser,getUsers,getUser,deleteUser,updateUser,resizeSingleImage};