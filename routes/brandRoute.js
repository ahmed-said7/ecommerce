let {createBrand,getBrands,
    getBrand,deleteBrand,updateBrand,resizeSingleImage}
    =require('../services/brandServices');


let {updateBrandValidator,createBrandValidator
    ,deleteBrandValidator,getBrandValidator}
    =require('../validator/brandValidator');


let {uploadSingleImage}=require('../middlewares/imageMiddleware');



let router=require('express').Router();

let {protected,allowedTo}=require('../services/authServices');
router.use(protected);

router.route('/')
    .post(createBrandValidator,uploadSingleImage('photo'),
        resizeSingleImage,createBrand)
    .get(getBrands);


router.route('/:id').
        get(getBrandValidator,getBrand)
        .delete(deleteBrandValidator,deleteBrand).
        put(updateBrandValidator,updateBrand);


module.exports=router;
