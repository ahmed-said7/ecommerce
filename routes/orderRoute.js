let {createOrder,checkoutSessions
    ,webhookSession
    ,updatePaidOrder,updateDeliveredOrder
}=require('../services/orderServices');



let router=require('express').Router();
let {protected,allowedTo}=require('../services/authServices');
router.use(protected);

router.route('/')
    .post(createOrder);

router.route('/session/:id').get(checkoutSessions);

router.route('/delivered/:id').get(updateDeliveredOrder);
router.route('/paid/:id').get(updatePaidOrder);
        
module.exports=router;