let {check}=require('express-validator');
let categoryModel=require('../models/categoryModel');
let validatorMiddleware=require('../middlewares/validationResult');
const apiError = require('../utils/apiError');

let createSubcategoryValidator=[
    check('name').notEmpty().withMessage('name is required').
    isString().withMessage('name should be alpha'),
    check('categoryId').isInt().withMessage('id should be Integer')
    .custom(async(val)=>{
        let category=await categoryModel.findByPk(val);
        if(!category){
            return Promise.reject(new apiError('Invalid category id',400));}
    }),
    validatorMiddleware
];

let updateSubcategoryValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    check('name').optional().
    isString().withMessage('name should be alpha'),
    validatorMiddleware
];

let deleteSubcategoryValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let getSubcategoryValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];


module.exports={updateSubcategoryValidator,createSubcategoryValidator
    ,deleteSubcategoryValidator,getSubcategoryValidator};