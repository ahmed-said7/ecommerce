

let {check}=require('express-validator');

let validatorMiddleware=require('../middlewares/validationResult');

let createContactValidator=[
    check('name').notEmpty().withMessage('name is required').
    isAlpha().withMessage('name should be alpha')
    .custom((val,{req})=>{
        req.body.userId=req.user.id;
        return true;
    }),
    check('phone').notEmpty().withMessage('phone is required').
    isMobilePhone('ar-EG').withMessage('name should be phone'),
    check('message').notEmpty().withMessage('details is required').
    isString().withMessage('details should be alpha'),
    check('email').notEmpty().withMessage('email is required').
    isEmail().withMessage('input should be email'),
    validatorMiddleware
];

let updateContactValidator=[
    check('name').optional().
    isAlpha().withMessage('name should be alpha')
    .custom((val,{req})=>{
        req.body.userId=req.user.id;
        return true;
    }),
    check('phone').optional().
    isMobilePhone('ar-EG').withMessage('name should be phone'),
    check('message').optional().
    isString().withMessage('details should be alpha'),
    check('email').optional().
    isEmail().withMessage('input should be email'),
    validatorMiddleware
];

let deleteContactValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let getContactValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];


module.exports={updateContactValidator,createContactValidator
    ,deleteContactValidator,getContactValidator};