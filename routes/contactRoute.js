let {createContact,getContacts,
    getContact,deleteContact,
    updateContact,setUserIdToBody,setFilterObj}=
    require('../services/contactServices');

let {updateContactValidator,createContactValidator
    ,deleteContactValidator,getContactValidator}
    =require('../validator/contactValidator');

let router=require('express').Router({mergeParams:true});

let {protected,allowedTo}=require('../services/authServices');
router.use(protected);

router.route('/').
    post(createContactValidator,setUserIdToBody,createContact).
    get(setFilterObj,getContacts);
router.route('/:id')
    .get(getContactValidator,getContact)
    .delete(deleteContactValidator,deleteContact).
    put(updateContactValidator,updateContact);


// router.route('/rev').post(setUserIdToBody,createContact).get(getContacts);

module.exports=router;