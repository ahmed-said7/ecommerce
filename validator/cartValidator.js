let {check}=require('express-validator');

let validatorMiddleware=require('../middlewares/validationResult');

let createCartValidator=[
    check('productId').notEmpty().withMessage('name is required').
    isInt().withMessage('productId should be Integer'),
    check('color').notEmpty().
    withMessage('color is required').
    isString().withMessage('color should be string'),
    validatorMiddleware
];

let updateProductCartValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    check('productId').notEmpty().withMessage('name is required').
    isInt().withMessage('productId should be Integer'),
    check('quantity').notEmpty().
    withMessage('quantity is required').
    isNumeric().withMessage('quantity should be string'),
    validatorMiddleware
];

let deleteCartValidator=[
    check('id').isInt().withMessage('id should be Integer'),

    validatorMiddleware
];

let getCartValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let removeProductCartValidator=[
    check('productId').notEmpty().withMessage('name is required').
    isInt().withMessage('productId should be Integer'),
    validatorMiddleware
];
module.exports={updateProductCartValidator,createCartValidator
    ,deleteCartValidator,getCartValidator
    ,removeProductCartValidator };