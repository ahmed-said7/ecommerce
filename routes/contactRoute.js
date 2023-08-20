let {createContact,getContacts,
    getContact,deleteContact,
    updateContact,setUserIdToBody,setFilterObj}=
    require('../services/contactServices');



let router=require('express').Router({mergeParams:true});

let {protected,login}=require('../services/authServices');

router.use(protected);

router.route('/').post(setUserIdToBody,createContact).
    get(setFilterObj,getContacts);
router.route('/:id')
    .get(getContact)
    .delete(deleteContact).put(updateContact);


// router.route('/rev').post(setUserIdToBody,createContact).get(getContacts);

module.exports=router;