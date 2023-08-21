let {check}=require('express-validator');

let validatorMiddleware=require('../middlewares/validationResult');

let createCountryValidator=[
    check('name').notEmpty().withMessage('name is required').
    isAlpha().withMessage('name should be alpha'),
    validatorMiddleware
];

let updateCountryValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    check('name').optional().
    isAlpha().withMessage('name should be alpha'),
    validatorMiddleware
];

let deleteCountryValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let getCountryValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];


module.exports={updateCountryValidator,createCountryValidator
    ,deleteCountryValidator,getCountryValidator};