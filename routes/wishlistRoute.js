let {
    addProductToWishlist , 
    removeProductFromWishlist,
    getUserWishlist
}=require('../services/wishlistServices');

let router=require('express').Router();

let {deleteFromWishlistValidator,addToWishlistValidator}
    =require('../services/wishlistServices');

let {protected,allowedTo}
        =require('../services/authServices');
    
router.use(protected);

router.route('/')
    .post(addToWishlistValidator,addProductToWishlist)
    .get(getUserWishlist)
    .delete(deleteFromWishlistValidator,removeProductFromWishlist);

module.exports=router;