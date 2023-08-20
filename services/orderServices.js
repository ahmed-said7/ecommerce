let expressHandler=require('express-async-handler');
let orderModel=require('../models/orderModel');
let cartModel=require('../models/cartModel');
let orderItems=require('../models/order_itemsModel');
const apiError = require('../utils/apiError');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
require('dotenv').config();


let stripe=require('stripe')(process.env.STRIPE_SECRET);


let createOrder=expressHandler(async(req,res,next)=>{
    
    let cart= await cartModel.findOne(
        {
            where:{userId:req.user.id}
            ,include:["cartItems"]
        }
        );
    
    
    if(!cart){
        return next(new apiError('Cart not found',400));
    };
    

    let totalPrice = cart.totalPriceAfterDiscount ?
        cart.totalPriceAfterDiscount : cart.totalPrice;
    
    let order=await orderModel.create({totalPrice,userId:req.user.id});
    

    await Promise.all(cart.cartItems.map((item)=>{
        orderItems.create({...item,orderId:order.id});
    }));
    
    await Promise.all(cart.cartItems.map(async(item)=>{
        let prod=await productModel.findByPk(item.productId);
        await prod.increment({quantity: item.quantity,sold: -item.quantity});
    }));
    

    await cartModel.destroy(
        {
            where:{userId:req.user.id}
        });
    
    res.status(200).json({order,items});
    

});

let updateDeliveredOrder=expressHandler(async(req,res,next)=>{
    let [order]=await orderModel.
        update({isDelivered:true,deliveredAt:Date.now()},{id:req.params.id});
    if(!order){
        return next(new apiError('Invalid order',400));
    };
    res.status(200).json({status:"success"});
});

let updatePaidOrder=expressHandler(async(req,res,next)=>{
    let [order]=await orderModel.
        update({isPaid:true,paidAt:Date.now()},{id:req.params.id});
    if(!order){
        return next(new apiError('Invalid order',400));
    };
    res.status(200).json({status:"success"});
});

let checkoutSessions=expressHandler(async(req,res,next)=>{

    let cart= await cartModel.findOne(
        {
            where:{userId:req.user.id}
            ,include:["cartItems"]
        }
        );
    
    if(!cart){
        return next(new apiError('Cart not found',400));
    };
    
    let totalPrice = cart.totalPriceAfterDiscount ?
        cart.totalPriceAfterDiscount : cart.totalPrice;
    
    let session = await stripe.checkout.sessions.create({
        line_items: [    
        {
            price_data:
                {
                currency:"egp" , unit_amount:totalPrice*100,
                product_data:{name:req.user.name}
                },
            quantity:1,
        },
                ],

        mode: 'payment',
        success_url: `http://localhost:4040/success.html`,
        cancel_url: `http://localhost:4040/cancel.html`,
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        
    });

    res.status(200).json({session,"status":"success"});
});

let createOnlineOrder=(async(data)=>{
    let cartId=data.client_reference_id;
    let email=data.customer_email;
    let user=await userModel.findOne({where:{email}});

    let cart= await cartModel.findOne(
        {
            where:{id:cartId}
            ,include:["cartItems"]
        }
        );
    
    if(!cart){
        return next(new apiError('Cart not found',400));
    };
    
    let totalPrice = cart.totalPriceAfterDiscount ?
        cart.totalPriceAfterDiscount : cart.totalPrice;
    
    let order=await orderModel.create({
        totalPrice, userId:user.id, isPaid:true, paidAt:Date.now()
    });
    

    
    await Promise.all(cart.cartItems.map((item)=>{
        orderItems.create({...item,orderId:order.id});
    }));
    

    await Promise.all(cart.cartItems.map(async(item)=>{
        let prod=await productModel.findByPk(item.productId);
        await prod.increment({quantity: item.quantity,sold: -item.quantity});
    }));
    

    await cartModel.destroy(
        {
            where:{id:cartId}
        });
});

let webhookSession=expressHandler(async(req,res,next)=>{
    let sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body,
                sig,process.env.STRIPE_SECRET);
    } catch (err) {
        console.log(err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
        
    };
    if(event.type === "checkout.session.completed"){
        createOnlineOrder(event.data.object);
        
    };
});
module.exports={createOrder,checkoutSessions
    ,webhookSession
    ,updatePaidOrder,updateDeliveredOrder
};