
let {getProducts,createProduct,deleteProduct
    ,updateProduct,
    getProduct,resizeMultipleImage,getImage}=require('../services/productServices');

let {uploadSingleImage,uploadMultipleImage}
    =require('../middlewares/imageMiddleware');

let {updateProductValidator,createProductValidator
    ,deleteProductValidator,
    getProductValidator}
    =require('../validator/productValidator');

let reviewRouter=require('./reviewRoute');
let router=require('express').Router();


router.route('/').
    post(createProductValidator,uploadMultipleImage([{name:"images",maxCount:7}
    ,{name:"profileImage",maxCount:1}]),resizeMultipleImage,createProduct).get(getProducts);

router.route('/:id').get(getProduct)
        .delete(deleteProduct).put(updateProduct);

router.route('/image').get(getImage)

router.use('/:productId/reviews',reviewRouter)


module.exports=router;