let {check}=require('express-validator');
let countryModel=require('../models/countryModel');
let validatorMiddleware=require('../middlewares/validationResult');
const apiError = require('../utils/apiError');

let createCityValidator=[
    check('name').notEmpty().withMessage('name is required').
    isString().withMessage('name should be alpha'),
    check('categoryId').isInt().withMessage('id should be Integer')
    .custom(async(val)=>{
        let country=await countryModel.findByPk(val);
        if(!country){
            return Promise.reject(new apiError('Invalid country id',400));}
    }),
    validatorMiddleware
];

let updateCityValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    check('name').optional().
    isString().withMessage('name should be alpha'),
    validatorMiddleware
];

let deleteCityValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let getCityValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];


module.exports={updateCityValidator,createCityValidator
    ,deleteCityValidator,getCityValidator};