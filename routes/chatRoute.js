let router=require('express').Router();

let {createChat,
    deleteChat,getChats,
    addMemberToChat,removeMemberFromChat,getChat}=
    require('../services/chatService');


let {protected,allowedTo}=require('../services/authServices');
router.use(protected);

let {createChatValidator
,deleteChatValidator,
getChatValidator,addChatMemberValidator,removeChatMemberValidator}=require('../validator/chatValidator');

let {protected,login}=require('../services/authServices');

router.use(protected);

router.route('/').post(createChatValidator,createChat).get(getChats);
router.route('/add').put(addChatMemberValidator,addMemberToChat);
router.route('/remove').put(removeChatMemberValidator,removeMemberFromChat);
router.route('/:id').delete(deleteChatValidator,deleteChat)
    ,get(getChatValidator,getChat);



module.exports=router;