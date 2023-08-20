let expressHandler=require('express-async-handler');
let messageModel=require('../models/messageModel');
let chat_user=require('../models/chat_userModel');
let chat=require('../models/chatModel');
let message_recipient=require('../models/message_recipientModel');
let {Op}=require('sequelize');
const sequelize = require('../config/database');
const apiError = require('../utils/apiError');

let createMessage=expressHandler(async(req,res,next)=>{

    let {chatId}=req.body;
    
    let chatUser=(await chat_user.findOne({where:{userId:req.user.id,chatId}}));
    
    req.body.chat_userId=chatUser.id;
    
    let message=await messageModel.create(req.body);
    
    
    let members=
    
    (await chat_user.
        findAll({where:{chatId,userId:{[Op.ne]:req.user.id}}})).
        map((doc)=> doc.userId);

    await Promise.all(members.map((val)=>{
        message_recipient.create({messageId:message.id, userId:val})
    }));

    res.status(200).json({message,'status':'success'});

});


let getChatMessages=expressHandler( async (req, res, next) => {
        
        let chatUser=await chat_user.findOne({where:{
            userId:req.user.id , 
            chatId:req.body.chatId
        }});
        
        if(!chatUser){
            return next(new apiError('you are not allowed to get messages',400))
        };
        
        
        let messages=await messageModel.findAll({
            include:[{
                model : chat_user ,
                where:{ chatId:req.body.chatId }
            },]
            } 
        );
        
        res.status(200).json({messages});
    
    }
);

let updateMessage=expressHandler(async (req,res,next)=>{
    let [message]=await messageModel.update(req.body,{
        where:{
            id:req.params.id },
        include:[{model:chat_user, where:{userId:req.user.id}}]
    });
    if(!message){
        return next(new apiError('Could not update message',400));
    };
    res.status(200).json({status:"message upated"});
});


let deleteMessage=expressHandler(async (req,res,next)=>{
    let message=await messageModel.destroy({
        where:{
            id:req.params.id },
        include:[{model:chat_user, where:{userId:req.user.id}}]
    });

    if(!message){
        return next(new apiError('Could not update message',400));
    };

    res.status(200).json({status:"message deleted"});
});

let getMessage=expressHandler(async (req,res,next)=>{
    let message=await messageModel.findOne({
        where:{
            id:req.params.id },
        include:[{model:chat_user, where:{userId:req.user.id}}]
    });

    if(!message){
        return next(new apiError('Could not update message',400));
    };

    res.status(200).json({status:"message found",message});
});

module.exports ={createMessage,getChatMessages,
    getMessage,deleteMessage,updateMessage};