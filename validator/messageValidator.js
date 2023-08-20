let {check}=require('express-validator');

let validatorMiddleware=require('../middlewares/validationResult');

let createMessageValidator=[
    check('text').notEmpty().withMessage('name is string').
    isString().withMessage('media should be string'),
    check('chatId').
    notEmpty().withMessage('chatId is required').
    isInt().withMessage('id should be Integer')
    ,
    validatorMiddleware
];

let updateMessageValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    check('text').optional().
    isString().withMessage('media should be string'),
    validatorMiddleware
];

let deleteMessageValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let getMessageValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let getChatMessagesValidator=[
    check('chatId').
    notEmpty().withMessage('chatId is required').
    isInt().withMessage('id should be Integer').
    custom()
    ,
    validatorMiddleware
];


module.exports={updateMessageValidator,createMessageValidator
    ,deleteMessageValidator,getMessageValidator};