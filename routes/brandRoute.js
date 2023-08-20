let {createBrand,getBrands,
    getBrand,deleteBrand,updateBrand,resizeSingleImage}
    =require('../services/brandServices');


let {uploadSingleImage}=require('../middlewares/imageMiddleware');

let {updateBrandValidator,createBrandValidator}
    =require('../validator/brandValidator')

let router=require('express').Router();

router.route('/')
    .post(createBrandValidator,uploadSingleImage('photo'),
        resizeSingleImage,createBrand).get(getBrands);
    router.route('/:id').get(getBrand)
        .delete(deleteBrand).put(updateBrandValidator,updateBrand);
    module.exports=router;
