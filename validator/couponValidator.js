let {check}=require('express-validator');

let validatorMiddleware=require('../middlewares/validationResult');

let createCouponValidator=[
    check('name').notEmpty().withMessage('name is required').
    isString().withMessage('name should be alpha'),
    check('discount').notEmpty().withMessage('discount is required').
    isNumeric().withMessage('discount should be num'),
    check('expired').notEmpty().withMessage('expired is required').
    isNumeric().withMessage('expired should be num'),
    validatorMiddleware
];

let updateCouponValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    check('name').optional().
    isString().withMessage('name should be alpha'),
    check('discount').optional().
    isNumeric().withMessage('discount should be num'),
    check('expired').optional().
    isNumeric().withMessage('expired should be num'),
    validatorMiddleware
];

let deleteCouponValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let getCouponValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];


module.exports={updateCouponValidator,createCouponValidator
    ,deleteCouponValidator,getCouponValidator};