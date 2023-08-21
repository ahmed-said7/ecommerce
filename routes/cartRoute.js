let {addProductToCart,removeProductFromCart
    ,updateProductQuantity,
    getLoggedUserCart,applyCoupon,deleteLoggedUserCart}
    =require('../services/cartServices');

let {updateProductCartValidator,createCartValidator
    ,deleteCartValidator,getCartValidator
    ,removeProductCartValidator }
    =require('../validator/cartValidator');

let router=require('express').Router();

let {protected,allowedTo}=require('../services/authServices');
router.use(protected);

router.route('/')
        .post(createCartValidator,addProductToCart)
        .get(getLoggedUserCart)
        .delete(removeProductCartValidator,removeProductFromCart);

router.route('/:id')
    .delete(deleteCartValidator,deleteLoggedUserCart).
    put(updateProductCartValidator,updateProductQuantity);

router.route('/apply-coupon').post(applyCoupon);

module.exports=router;