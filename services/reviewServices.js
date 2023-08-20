let reviewModel=require('../models/reviewModel');
const apiError = require('../utils/apiError');

let {createDoc,getDoc,deleteDoc,updateDoc,getDocs} 
    = require('../utils/factory');

let expressHandler=require('express-async-handler');


let createReview=createDoc(reviewModel);

let setFilterObj=expressHandler(async(req,res,next)=>{
    if(req.params.productId){
        let productId = req.params.productId;
        req.filter={productId}
    };
    next();
});

let getReview=getDoc(reviewModel);
let deleteReview=deleteDoc(reviewModel);
let updateReview=updateDoc(reviewModel);
let getReviews=getDocs(reviewModel);

let setUserIdToBody=expressHandler(async(req,res,next)=>{
    if(!req.body.userId){
        req.body.userId = req.user.id;
    };
    next();
});


module.exports={createReview,getReviews,
    getReview,deleteReview,updateReview,setUserIdToBody,setFilterObj};