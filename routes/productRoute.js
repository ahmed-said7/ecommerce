
let {getProducts,createProduct,deleteProduct
    ,updateProduct,
    getProduct,resizeMultipleImage}=require('../services/productServices');


let {updateProductValidator,createProductValidator
    ,deleteProductValidator,getProductValidator}
    =require('../validator/productValidator');


let {uploadSingleImage,uploadMultipleImage}
    =require('../middlewares/imageMiddleware');



let reviewRouter=require('./reviewRoute');
let router=require('express').Router();

let {protected,allowedTo}=require('../services/authServices');
router.use(protected);

router.route('/').
    post(createProductValidator,uploadMultipleImage([{name:"images",maxCount:7}
    ,{name:"profileImage",maxCount:1}]),resizeMultipleImage,createProduct).get(getProducts);

router.route('/:id')
        .get(getProductValidator,getProduct)
        .delete(deleteProductValidator,deleteProduct)
        .put(updateProductValidator,updateProduct);



router.use('/:productId/reviews',reviewRouter)


module.exports=router;