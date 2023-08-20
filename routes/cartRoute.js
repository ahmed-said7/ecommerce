let {addProductToCart,removeProductFromCart
    ,updateProductQuantity,
    getLoggedUserCart,applyCoupon,deleteLoggedUserCart}
    =require('../services/cartServices');

let router=require('express').Router();
let {protected}=require('../services/authServices');

router.use(protected);
router.route('/')
        .post(addProductToCart).get(getLoggedUserCart)
        .delete(removeProductFromCart);

router.route('/:id').delete(deleteLoggedUserCart).put(updateProductQuantity);
router.route('/apply-coupon').post(applyCoupon);

module.exports=router;