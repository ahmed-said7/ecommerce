let {check}=require('express-validator');

let validatorMiddleware=require('../middlewares/validationResult');
const userModel = require('../models/userModel');
const apiError = require('../utils/apiError');

let createUserValidator=[
    check('name').notEmpty().withMessage('name is required').
    isString().withMessage('name should be alpha'),
    check('email').notEmpty().withMessage('email is required').
    isEmail().withMessage('email should be an email').
    custom(async(val,{req})=>{
        let user=await userModel.findOne({where:{email:val}});
        if(user){
            return Promise.reject(new apiError('User found'))
        };
        return true;
    }),
    check('username').notEmpty().withMessage('name is required').
    isString().withMessage('name should be alpha').
    custom(async(val,{req})=>{
        let user=await userModel.findOne({where:{username:val}});
        if(user){
            return Promise.reject(new apiError('User found'))
        };
        return true;
    })
    ,
    check('password').notEmpty().withMessage('password is required')
    .isString().withMessage('password must be string')
    .isLength({min:6}).withMessage('password must be at least 6 characters')
    .custom((val,{req})=>{
        if(val != req.body.passwordConfirm){
            return Promise.reject(new apiError('password confirmation not correct'));
        };
        return true;
    }),
    check('passwordConfirm').notEmpty().withMessage('passwordConfirm is required'),
    validatorMiddleware
];

let updateUserValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    check('name').optional().
    isString().withMessage('name should be alpha'),
    check('email').optional().
    isEmail().withMessage('email should be an email').
    custom(async(val,{req})=>{
        let user=await userModel.findOne({where:{email:val}});
        if(user){
            return Promise.reject(new apiError('User found'))
        };
        return true;
    }),
    check('username').optional().
    isString().withMessage('name should be alpha').
    custom(async(val,{req})=>{
        let user=await userModel.findOne({where:{username:val}});
        if(user){
            return Promise.reject(new apiError('User found'))
        };
        return true;
    })
    ,
    check('password').optional()
    .isString().withMessage('password must be string')
    .isLength({min:6}).withMessage('password must be at least 6 characters')
    ,
    validatorMiddleware
];

let deleteUserValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let getUserValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let bcryptjs=require('bcryptjs');

let updateLoggedUserPasswordValidator=[
    check('currentPassword').notEmpty().withMessage('password is required')
    .isString().withMessage('password must be string').
    custom(async(val,{req})=>{
        let valid=await bcryptjs.compare(val,req.user.password);
        if(!valid){
            return Promise.reject(new apiError('password is incorrect',400))
        };
        return true;
    }),
    check('password').notEmpty().withMessage('password is required')
    .isString().withMessage('password must be string')
    .isLength({min:6}).withMessage('password must be at least 6 characters')
    .custom((val,{req})=>{
        if(val != req.body.passwordConfirm){
            return Promise.reject(new apiError('password confirmation not correct'));
        };
        return true;
    }),
    check('passwordConfirm').notEmpty().withMessage('passwordConfirm is required'),
    validatorMiddleware
];

let updateLoggedUserValidator=[
    check('name').optional().
    isString().withMessage('name should be alpha'),
    check('email').optional().
    isEmail().withMessage('email should be an email').
    custom(async(val,{req})=>{
        let user=await userModel.findOne({where:{email:val}});
        if(user){
            return Promise.reject(new apiError('User found'))
        };
        return true;
    }),
    check('username').optional().
    isString().withMessage('name should be alpha').
    custom(async(val,{req})=>{
        let user=await userModel.findOne({where:{username:val}});
        if(user){
            return Promise.reject(new apiError('User found'))
        };
        return true;
    })
    ,
    validatorMiddleware
];
module.exports={updateUserValidator,createUserValidator
    ,deleteUserValidator,getUserValidator
,updateLoggedUserPasswordValidator
,updateLoggedUserValidator};