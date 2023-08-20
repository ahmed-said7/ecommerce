let router=require('express').Router();

let {protected,login}=require('../services/authServices');

let {uploadSingleImage,uploadMultipleImage}
    =require('../middlewares/imageMiddleware');

let {createUser,getUsers,getUser,
    deleteUser,updateUser,resizeSingleImage}=require('../services/userServices');

router.route('/login').post(login);

router.route('/').post(uploadSingleImage('image'),
    resizeSingleImage,createUser).get(protected,getUsers);
router.route('/:id').get(getUser)
    .delete(deleteUser).put(updateUser);


module.exports=router;