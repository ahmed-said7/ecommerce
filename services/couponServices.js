let couponModel=require('../models/couponModel');

let expressHandler=require('express-async-handler');

let {createDoc,getDoc,deleteDoc,updateDoc,getDocs} 
    = require('../utils/factory');

let setExpiredToBody=expressHandler(async(req,res,next)=>{
    let {expired}=req.body;
    if(expired){
        req.body.expired=Date.now()+ (expired*24*60*60*1000);
    };
    next();
});

let createCoupon=createDoc(couponModel);
let getCoupon=getDoc(couponModel);
let deleteCoupon=deleteDoc(couponModel);
let updateCoupon=updateDoc(couponModel);
let getCoupons=getDocs(couponModel);

module.exports={createCoupon,getCoupons,
    getCoupon,deleteCoupon,updateCoupon,setExpiredToBody};