let {createCoupon,getCoupons,
    getCoupon,deleteCoupon,updateCoupon,setExpiredToBody}=require('../services/couponServices');



let router=require('express').Router();

let {updateCouponValidator,createCouponValidator
    ,deleteCouponValidator,getCouponValidator}=require('../validator/couponValidator');

let {protected,allowedTo}=require('../services/authServices');
router.use(protected);



router.route('/')
    .post(createCouponValidator,setExpiredToBody,createCoupon)
    .get(getCoupons);


router.route('/:id').
    get(getCouponValidator,getCoupon)
    .delete(deleteCouponValidator,deleteCoupon)
    .put(updateCouponValidator,updateCoupon);


module.exports=router;