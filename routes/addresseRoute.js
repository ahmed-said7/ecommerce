let {createAddresse,getUserAddresse,
    getLoggedUserAddresses,deleteAddresse,updateAddresse}
    =require('../services/addresseServices');

let {updateAddresseValidator,createAddresseValidator
    ,deleteAddresseValidator,getAddresseValidator}=
    requie('../validator/addresseValidator.js');

let router = require('express').Router();

let {protected,allowedTo}=require('../services/authServices');
router.use(protected);

router.route('/')
    .post(createAddresseValidator,createAddresse)
    .get(getLoggedUserAddresses);



router.route('/:id')
    .get(getAddresseValidator,getUserAddresse)
    .delete(deleteAddresseValidator,deleteAddresse)
    .put(updateAddresseValidator,updateAddresse);


module.exports=router;