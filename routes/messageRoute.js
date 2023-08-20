let {createMessage,getChatMessages,
    getMessage,deleteMessage,updateMessage}=require('../services/messageServices');
let router=require('express').Router();

let {protected,login}=require('../services/authServices');

router.use(protected);

router.route('/').post(createMessage).get(getChatMessages);
router.route('/:id')
    .get(getMessage)
    .delete(deleteMessage).put(updateMessage);


module.exports=router;