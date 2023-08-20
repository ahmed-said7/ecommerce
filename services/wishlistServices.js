let expressHandler=require('express-async-handler');
let wishlistModel=require("../models/user_wishlistModel");
const apiError = require('../utils/apiError');

let addProductToWishlist=expressHandler(async(req,res,next)=>{
    let {productId}=req.body;
    let wishlist=await wishlistModel.create({userId:req.user.id,productId})
    if(!wishlist){
        return next(new apiError('Could not create wishlist',400));
    };
    res.status(200).json({result:wishlist});
});

let removeProductFromWishlist=expressHandler(async(req,res,next)=>{
    let {productId}=req.body;
    let wishlist=await wishlistModel.
        destroy({where:{userId:req.user.id,productId}});
    
        if(!wishlist){
        return next(new apiError('Could not delete wishlist',400));
    };
    
    res.status(200).json({result:wishlist});

});

let getUserWishlist=expressHandler(async (req,res,next)=>{
    let wishlist=await wishlistModel.
        findAll({where:{userId:req.user.id}
        ,include:["user","product"]
        });
    
        if(!wishlist){
        return next(new apiError('Could not delete wishlist',400));
    };
    
    res.status(200).json({result:wishlist});
});


module.exports = {
    addProductToWishlist , 
    removeProductFromWishlist,
    getUserWishlist
};