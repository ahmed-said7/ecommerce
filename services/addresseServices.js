let addresseModel=require('../models/addresseModel');
const apiError = require('../utils/apiError');

let {createDoc,getDoc,deleteDoc,updateDoc,getDocs} 
    = require('../utils/factory');

let expressHandler=require('express-async-handler');

let createAddresse=expressHandler(async (req, res, next) => {
    req.body.userId=req.user.id;
    let addresse=await addresseModel.create(req.body);
    if(!addresse){
        return next(new apiError('can not create a new addresse',400));
    };
    res.status(200).json({addresse});
});

let getLoggedUserAddresses=expressHandler(async (req, res, next) => {
    let addresse=await addresseModel.findAll({where:
        {
            userId: req.user.id
        }});
    if(!addresse){
        return next(new apiError('can not get addresses',400));
    };
    res.status(200).json({addresse});
});

let deleteAddresse=expressHandler(async (req, res, next) => {
    let addresse=await addresseModel.destroy({where:
        {
            userId: req.user.id , id: req.params.id
        }});
    if(!addresse){
        return next(new apiError('can not delete addresses',400));
    };
    res.status(200).json({addresse});
});

let updateAddresse=expressHandler(async (req, res, next) => {
    let addresse=await addresseModel.update(req.body,{where:
        {
            userId: req.user.id , id: req.params.id
        }});
    if(!addresse){
        return next(new apiError('can not delete addresses',400));
    };
    res.status(200).json({addresse});
});


let getUserAddresse=expressHandler(async (req, res, next) => {
    let addresse=await addresseModel.findAll({where:
        {
            userId: req.params.id
        }});
    if(!addresse){
        return next(new apiError('can not get addresses',400));
    };
    res.status(200).json({addresse});
});

module.exports={createAddresse,getUserAddresse,
    getLoggedUserAddresses,deleteAddresse,updateAddresse};