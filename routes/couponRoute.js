let {createCoupon,getCoupons,
    getCoupon,deleteCoupon,updateCoupon,setExpiredToBody}=require('../services/couponServices');



let router=require('express').Router();


router.route('/')
    .post(setExpiredToBody,createCoupon).get(getCoupons);


router.route('/:id').get(getCoupon)
    .delete(deleteCoupon).put(updateCoupon);


module.exports=router;