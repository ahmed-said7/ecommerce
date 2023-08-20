let expressHandler=require('express-async-handler');
let couponModel=require('../models/couponModel');
let cartModel=require('../models/cartModel');
let cartItems=require('../models/cart_items');
let productModel=require('../models/productModel');
const apiError = require('../utils/apiError');
let {Op}=require('sequelize');

let calcPrice=function(items){
    let sum=0
    items.forEach(function(item){
        sum += item.price * item.quantity;
    });
    return sum;
};

let addProductToCart=expressHandler(async(req,res,next)=>{
    let {productId,color}=req.body;
    let product=await productModel.findOne({ where : {id:productId} });
    // res.json({product});
    // console.log(req.user);
    let cart=await cartModel.findOne({ where : {userId:req.user.id} });
    // console.log(cart);
    // res.json({cart});
    
    if(!cart){
        cart=await cartModel.create({ userId : req.user.id });
        await cartItems.create( {
            cartId : cart.id,
            productId : product.id,
            price : product.price,
            color
        } );
    }else{
        let Item=await cartItems.
                findOne({where:{ productId:product.id,cartId:cart.id }});
        // res.json({Item})
        if(Item){
            Item.quantity += 1;
            await Item.save();
        }else{
            
            await cartItems.create({
                cartId : cart.id,
                productId : product.id,
                price : product.price,
                color
            });

        };
    };
    Items=await cartItems.findAll({where:{cartId:cart.id}});
    cart.totalPrice=calcPrice(Items);
    await cart.save();
    res.status(200).json({Items,cart});
});

let updateProductQuantity=expressHandler(async(req,res,next)=>{
    let cart=await cartModel.findOne({ where : {id:req.params.id} });
    if(!cart){
        return next(new apiError('Cart not found',400));
    };
    let {productId,quantity}=req.body;
    let Item=await cartItems.findOne({where:{productId,cartId:req.params.id}});
    if(!Item){
        let product=await productModel.findOne({ where : {id:productId} });
        await cartItems.create({
            cartId : cart.id,
            productId : product.id,
            price : product.price,
            color, quantity
        });
    }else{
        Item.quantity=quantity;
        await Item.save();
    };
    let Items=await cartItems.findAll({where:{cartId:req.params.id}});
    cart.totalPrice=calcPrice(Items);
    await cart.save();
    res.status(200).json({Items,cart});
});

let removeProductFromCart = expressHandler(async(req,res,next)=>{
    let Items;
    let {productId}=req.body;
    let cart=await cartModel.findOne({ where : {userId:req.user.id} });
    if(!cart){
        return next(new apiError('Cart not found',400));
    };
    let Item=await cartItems.findOne({where:{productId,cartId:cart.id}});
    if(Item){
        await Item.destroy();
        Items=await cartItems.findAll({where:{cartId:cart.id}});
        cart.totalPrice=calcPrice(Items);
        await cart.save();
    };
    res.status(200).json({Items,cart});
});

let getLoggedUserCart=expressHandler(async(rqe,res,next)=>{
    let cart=await cartModel.findOne({ where : {userId:req.user.id} });
    if(!cart){
        return next(new apiError('Cart not found',400));
    };
    let Items=await cartItems.findAll({where:{id:cart.id}});
    res.status(200).json({Items,cart});
});


let applyCoupon=expressHandler(async (req,res,next)=>{
    let {name}=req.body;

    let cart=await cartModel.findOne({ where : {userId:req.user.id} });

    if(!cart){
        return next(new apiError('Cart not found',400));
    };

    let coupon=await couponModel.findOne(
        { where : {
        name,  expired:{ [Op.gt] : Date.now() }    }}
    );

    if(!coupon){
        return next(new apiError('Coupon not found',400));
    };
    
    cart.totalPriceAfterDiscount
    =Math.round(cart.totalPrice/(coupon.discount/100));
    
    await cart.save();
    
    res.status(200).json({cart});
    
});
let deleteLoggedUserCart=expressHandler(async(req,res,next)=>{
    let cart=await cartModel.destroy({where:{id:req.params.id}});
    if(!cart){
        return next(new apiError('Cart not found',400));
    };
    res.status(200).json({staus:"success"});
});
module.exports={addProductToCart,removeProductFromCart
    ,updateProductQuantity,getLoggedUserCart
    ,applyCoupon,deleteLoggedUserCart};