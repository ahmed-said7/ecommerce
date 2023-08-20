let {check}=require('express-validator');

let validatorMiddleware=require('../middlewares/validationResult');

let createAddresseValidator=[
    check('name').notEmpty().withMessage('name is required').
    isAlpha().withMessage('name should be alpha')
    .custom((val,{req})=>{
        req.body.userId=req.user.id;
        return true;
    }),
    check('phone').notEmpty().withMessage('phone is required').
    isMobilePhone('ar-EG').withMessage('name should be phone'),
    check('city').notEmpty().withMessage('city is required').
    isAlpha().withMessage('city should be alpha'),
    check('details').notEmpty().withMessage('details is required').
    isAlpha().withMessage('details should be alpha'),
    check('email').notEmpty().withMessage('email is required').
    isEmail().withMessage('input should be email'),
    check('country').optional().
    isAlpha().withMessage('country should be alpha'),
    check('postalCode').optional().
    isAlpha().withMessage('postalCode should be alpha'),
    check('alias').optional().
    isAlpha().withMessage('alias should be alpha'),
    validatorMiddleware
];

let updateAddresseValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    check('name').optional().
    isAlpha().withMessage('name should be alpha'),
    check('phone').optional().
    isMobilePhone('ar-EG').withMessage('name should be phone'),
    check('city').optional().
    isAlpha().withMessage('city should be alpha'),
    check('details').optional().
    isAlpha().withMessage('details should be alpha'),
    check('email').optional().
    isEmail().withMessage('input should be email'),
    check('country').optional().
    isAlpha().withMessage('country should be alpha'),
    check('postalCode').optional().
    isAlpha().withMessage('postalCode should be alpha'),
    check('alias').optional().
    isAlpha().withMessage('alias should be alpha'),
    validatorMiddleware
];

let deleteAddresseValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    
];


let getAddresseValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];


module.exports={updateAddresseValidator,createAddresseValidator
    ,deleteAddresseValidator,getAddresseValidator};