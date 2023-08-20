let {createAddresse,getUserAddresse,
    getLoggedUserAddresses,deleteAddresse,updateAddresse}
    =require('../services/addresseServices');

let router = require('express').Router();


router.route('/')
    .post(createAddresse).get(getLoggedUserAddresses);
    router.route('/:id').get(getUserAddresse)
        .delete(deleteAddresse).put(updateAddresse);


module.exports=router;