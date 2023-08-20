let {check}=require('express-validator');

let slugify=require('slugify');

let validatorMiddleware=
    require('../middlewares/validationResult');

let createCategoryValidator=[
    check('name')
    .notEmpty().withMessage('name is required').isString().withMessage('name should be alpha')
    .custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    })
    ,
    validatorMiddleware
];

let updateCategoryValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    check('name').optional().
    isString().withMessage('name should be alpha'),
    validatorMiddleware
];

let deleteCategoryValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let getCategoryValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

module.exports={updateCategoryValidator,deleteCategoryValidator
    ,createCategoryValidator,getCategoryValidator};