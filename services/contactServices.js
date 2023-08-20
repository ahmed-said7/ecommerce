let contactModel=require('../models/contactModel');
const apiError = require('../utils/apiError');

let {createDoc,getDoc,deleteDoc,updateDoc,getDocs} 
    = require('../utils/factory');

let expressHandler=require('express-async-handler');


let createContact=createDoc(contactModel);

let setFilterObj=expressHandler(async(req,res,next)=>{
    req.filter={}
    req.filter.userId=req.user.id;
    next();
});

let getContact=getDoc(contactModel);
let deleteContact=deleteDoc(contactModel);
let updateContact=updateDoc(contactModel);
let getContacts=getDocs(contactModel);

let setUserIdToBody=expressHandler(async(req,res,next)=>{
    if(!req.body.userId){
        req.body.userId = req.user.id;
    };
    next();
});


module.exports={createContact,getContacts,
    getContact,deleteContact,updateContact,setUserIdToBody,setFilterObj};