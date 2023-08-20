let router=require('express').Router();

let {createChat}=require('../services/chatService')

let {protected,login}=require('../services/authServices');
router.use(protected);
router.route('/').post(createChat);
// router.route('/:id').get(getUser)
    // .delete(deleteUser).put(updateUser);


module.exports=router;