let {createMessage,getChatMessages,
    getMessage,deleteMessage,updateMessage}=require('../services/messageServices');
let router=require('express').Router();




let {updateMessageValidator,createMessageValidator
    ,deleteMessageValidator,getMessageValidator}
    =require('../validator/messageValidator');


let {protected,allowedTo}=require('../services/authServices');
router.use(protected);

router.route('/').
    post(createMessageValidator,createMessage)
    .get(getChatMessages);
router.route('/:id')
    .get(getMessageValidator,getMessage)
    .delete(deleteMessageValidator,deleteMessage)
    .put(updateMessageValidator,updateMessage);


module.exports=router;