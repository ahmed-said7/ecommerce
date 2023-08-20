let {check}=require('express-validator');

let validatorMiddleware=require('../middlewares/validationResult');

let deleteFromWishlistValidator=[
    check('productId').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let addToWishlistValidator=[
    check('productId').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];


module.exports={deleteFromWishlistValidator,addToWishlistValidator};