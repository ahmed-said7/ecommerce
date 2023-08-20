let {check}=require('express-validator');

let validatorMiddleware=require('../middlewares/validationResult');

let createChatValidator=[
    check('members').notEmpty().withMessage('members is required').
    isArray().withMessage('name should be array'),
    validatorMiddleware
];

let updateChatValidator=[
    check('id').isInt().withMessage('id should be Integer'),
    check('name').optional().
    isAlpha().withMessage('name should be alpha'),
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

module.exports={updateChatValidator,createChatValidator
    ,deleteChatValidator,getChatValidator};