let {
    addProductToWishlist , 
    removeProductFromWishlist,
    getUserWishlist
}=require('../services/wishlistServices');

let router=require('express').Router();

router.route('/')
    .post(addProductToWishlist)
    .get(getUserWishlist)
    .delete(removeProductFromWishlist);

module.exports=router;