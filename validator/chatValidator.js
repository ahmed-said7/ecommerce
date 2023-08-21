let {check}=require('express-validator');

let validatorMiddleware=require('../middlewares/validationResult');

let createChatValidator=[
    check('members').notEmpty().withMessage('members is required').
    isArray().withMessage('name should be array'),
    validatorMiddleware
];



let deleteChatValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let getChatValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let addChatMemberValidator=[
    check('chatId').notEmpty().withMessage('members is required')
    .isInt().withMessage('id should be Integer'),
    check('chatId').notEmpty().withMessage('members is required')
    .isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

let removeChatMemberValidator=[
    check('chatId').notEmpty().withMessage('members is required')
    .isInt().withMessage('id should be Integer'),
    check('chatId').notEmpty().withMessage('members is required')
    .isInt().withMessage('id should be Integer'),
    validatorMiddleware
];

module.exports={createChatValidator
    ,deleteChatValidator,
    getChatValidator,addChatMemberValidator
    ,removeChatMemberValidator};