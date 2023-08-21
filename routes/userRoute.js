let router=require('express').Router();

let {protected,login}=require('../services/authServices');

let {uploadSingleImage,uploadMultipleImage}
    =require('../middlewares/imageMiddleware');

let {createUser,getUsers,getUser,
    deleteUser,updateUser,resizeSingleImage
    ,getLoggedUser,deleteLoggedUser,updateLoggedUser,
    updateLoggedUserPassword
}=require('../services/userServices');

let {updateUserValidator,createUserValidator
    ,deleteUserValidator,getUserValidator
,updateLoggedUserPasswordValidator
,updateLoggedUserValidator}=require('../validator/userValidator');



let {protected,login,signup,allowedTo
    ,changePassword,vertifyPassword,forgetPassword}
    =require('../services/authServices');

// router.use(protected);

router.route('/login').post(login);
router.route('/register').post(createUserValidator,signup);
router.route('/forget-pass').post(forgetPassword);
router.route('/vertify-code').post(vertifyPassword);
router.route('/update-pass').post(changePassword);


router.route('/')
    .post(createUserValidator,uploadSingleImage('image'),resizeSingleImage,createUser)
    .get(getUsers);

router.route('/:id')
    .get(getUserValidator,getUser)
    .delete(deleteUserValidator,deleteUser).
    put(updateUserValidator,updateUser);

router.route('/get-me')
    .get(getLoggedUser);


router.route('/update-me')
    .get(updateLoggedUserValidator,updateLoggedUser);


router.route('/update-password')
    .get(updateLoggedUserPasswordValidator,updateLoggedUserPassword);


router.route('/delete-me')
    .get(deleteLoggedUser);


module.exports=router;