let {check}=require('express-validator');

let validatorMiddleware=require('../middlewares/validationResult');

let createBrandValidator=[
    check('name').notEmpty().withMessage('name is required').
    isAlpha().withMessage('name should be alpha'),
    validatorMiddleware
];

let updateBrandValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    check('name').optional().
    isAlpha().withMessage('name should be alpha'),
    validatorMiddleware
];

let deleteBrandValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let getBrandValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];


module.exports={updateBrandValidator,createBrandValidator
    ,deleteBrandValidator,getBrandValidator};
