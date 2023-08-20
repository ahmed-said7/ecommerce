let expressHandler=require('express-async-handler');
let chatModel=require('../models/chatModel');
let chat_userModel=require('../models/chat_userModel');

let {createDoc,getDoc,deleteDoc,updateDoc,getDocs} 
    = require('../utils/factory');
const apiError = require('../utils/apiError');

let createChat=expressHandler(async(req,res,next)=>{
    let doc=await chatModel.create();
    let chatId=doc.id;
    req.body.members.push(req.user.id);
    await Promise.all(
        req.body.members.map((val)=>{
            chat_userModel.create({chatId,userId:val})
        })
    );
    let docs=await chat_userModel.findAll({include:chatModel})
    res.status(200).json({doc,'status':'success',docs});
});

let getChats=expressHandler(async(req,res,next)=>{
    let chats=await chatModel.findAll(
        {include:chat_userModel,where:{userId:req.user.id}}
        );
    if(!chats){
        return next(new apiError('Could not find chats',400));
    };
    res.status(200).json({chats,status:"success"});
});

let deleteChat=expressHandler(async(req,res,next)=>{
    let chat=await chatModel.destroy(
        {
            where:{ include:chat_userModel , where : {userId:req.user.id}
            ,id:req.params.id },
        }
        );
    if(!chat){
        return next(new apiError('Could not delete chat',400));
    }
    
    res.status(200).json({status: 'deleted'});
});

let addMemberToChat=expressHandler(async(req,res,next)=>{
    let chat=await chat_userModel.create(
        {
            userId:req.body.member,
            chatId:req.body.chatId
        }
        );
    if(!chat){
        return next(new apiError('Could not delete chat',400));
    }
    
    res.status(200).json({status: 'deleted'});
});

let removeMemberFromChat=expressHandler(async(req,res,next)=>{
    let chat=await chat_userModel.destroy(
        {
            where:{userId:req.body.member,
                chatId:req.body.chatId}
        }
        );
    if(!chat){
        return next(new apiError('Could not delete chat',400));
    }
    
    res.status(200).json({status: 'member deleted'});
});

module.exports={createChat};