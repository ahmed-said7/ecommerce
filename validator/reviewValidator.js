let {check}=require('express-validator');

let validatorMiddleware=require('../middlewares/validationResult');
const apiError = require('../utils/apiError');
const reviewModel = require('../models/reviewModel');

let createReviewValidator=[
    check('comment').optional().
    isString().withMessage('name should be alpha'),
    check('stars').notEmpty().withMessage('stars is required').
    isNumeric().withMessage('stars should be number')
    .custom(async(val,{req})=>{
        if(val > 5 || val < 0) {
            return Promise.reject(new apiError('Invalid value',400))
        };
    }),
    validatorMiddleware
];

let updateReviewValidator=[
    check('id').isInt().withMessage('id should be Integer')
    .custom(async(val,{req})=>{
        let review= await reviewModel.findOne(
            {   where:{
                id:val,userId:req.user.id}   });

        if(!review){
            return Promise.reject(new apiError('you are not allowed',400))
        };

        return true;
    }),
    check('comment').optional().
    isString().withMessage('name should be alpha'),
    check('stars').optional().
    isNumeric().withMessage('stars should be number')
    .custom(async(val,{req})=>{
        if(val > 5 || val < 0) {
            return Promise.reject(new apiError('Invalid value',400))
        };
    }),
    validatorMiddleware
];

let deleteReviewValidator=[
    check('id').isInt().withMessage('id should be Integer')
    .custom(async(val,{req})=>{
        if(req.user.role != 'admin'){
            let review= await reviewModel.findOne(
                {
                    where:{
                    id:val,userId:req.user.id}}
                )
            if(!review){
                return Promise.
                reject(new apiError('you are not allowed',400))
            };
        };
        return true;
    })
    
    ,validatorMiddleware
];

let getReviewValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];


module.exports={updateReviewValidator,createReviewValidator
    ,deleteReviewValidator,getReviewValidator};