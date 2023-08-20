let {check}=require('express-validator');
let categoryModel=require('../models/categoryModel');
let validatorMiddleware=require('../middlewares/validationResult');
const apiError = require('../utils/apiError');
const brandModel = require('../models/brandModel');
const subcategoryModel = require('../models/subcategoryModel');
let {Op}=require('sequelize');

let createProductValidator=[
    check('name').notEmpty().withMessage('name is required').
    isString().withMessage('name should be alpha'),
    check('categoryId').notEmpty().withMessage('categoryId is required')
    .isInt().withMessage('categoryId should be Integer')
    .custom(async(val)=>{
        let category=await categoryModel.findByPk(val);
        if(!category){
            return Promise.reject(new apiError('Invalid category id',400));}
    })
    ,check('brandId').notEmpty().withMessage('brandId is required')
    .isInt().withMessage('brandId should be Integer')
    .custom(async(val)=>{
        let brand=await brandModel.findByPk(val);
        if(!brand){
            return Promise.reject(new apiError('Invalid brand id',400));}
    }),
    check('subcategories').notEmpty().withMessage('subcategoryId is required')
    .isArray().withMessage('subcategories must be an array')
    .custom(async(val)=>{
        let subcategoryies=await subcategoryModel.findAll({
            where:{id:{[Op.in]:val}}
        });
        if(subcategoryies.length != val.length){
            return Promise.reject(new apiError('Invalid subcategory ids',400))
        };
    }).custom(async(val,{req})=>{
        let subcategoryies=await subcategoryModel.findAll({
            where:{categoryId:req.body.categoryId}    });
        subcategoryies = subcategoryies.map( sub => sub.id );
        let valid=val.every( value => subcategoryies.includes(value) );
        if(!valid){
            return Promise.reject(new apiError('Invalid subcategory Id',400));
        };
    }),
    check('price').notEmpty().withMessage('price is required')
    .isNumeric().withMessage('price must be a number'),
    check('description').notEmpty().withMessage('description is required').
    isString().withMessage('description should be alpha'),
    check('quantity').notEmpty().withMessage('quantity is required').
    isNumeric().withMessage('quantity should be numper'),
    validatorMiddleware
];

let updateProductValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    check('name').optional().
    isString().withMessage('name should be alpha'),
    check('categoryId').optional()
    .isInt().withMessage('categoryId should be Integer')
    .custom(async(val)=>{
        let category=await categoryModel.findByPk(val);
        if(!category){
            return Promise.reject(new apiError('Invalid category id',400));}
    })
    ,check('brandId').optional()
    .isInt().withMessage('brandId should be Integer')
    .custom(async(val)=>{
        let brand=await brandModel.findByPk(val);
        if(!brand){
            return Promise.reject(new apiError('Invalid brand id',400));}
    }),
    check('subcategories').optional()
    .isArray().withMessage('subcategories must be an array')
    .custom(async(val)=>{
        let subcategoryies=await subcategoryModel.findAll({
            where:{id:{[Op.in]:val}}
        });
        if(subcategoryies.length != val.length){
            return Promise.reject(new apiError('Invalid subcategory ids',400))
        };
    }).custom(async(val,{req})=>{
        let subcategoryies=await subcategoryModel.findAll({
            where:{categoryId:req.body.categoryId}    });
        subcategoryies = subcategoryies.map( sub => sub.id );
        let valid=val.every( value => subcategoryies.includes(value) );
        if(!valid){
            return Promise.reject(new apiError('Invalid subcategory Id',400));
        };
    }),
    check('price').optional().
    isNumeric().withMessage('price must be a number'),
    check('description').optional().
    isString().withMessage('description should be alpha'),
    check('quantity').optional().
    isNumeric().withMessage('quantity should be numper'),
    validatorMiddleware
];

let deleteProductValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let getProductValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];


module.exports={updateProductValidator,createProductValidator
    ,deleteProductValidator,getProductValidator};