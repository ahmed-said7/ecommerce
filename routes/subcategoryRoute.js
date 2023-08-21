let {createSubcategory,getSubcategories,
    getSubcategory,deleteSubcategory
    ,updateSubcategory,resizeSingleImage}=
    require('../services/subcategoryServices');

let {updateSubcategoryValidator,createSubcategoryValidator
    ,deleteSubcategoryValidator,getSubcategoryValidator}
    =require('../validator/subcategoryVaildator')

let {uploadSingleImage,uploadMultipleImage}
    =require('../middlewares/imageMiddleware');

let router=require('express').Router();

let {protected,allowedTo}=require('../services/authServices');
router.use(protected);


router.route('/').
    post(createSubcategoryValidator,uploadSingleImage('photo'),
    resizeSingleImage,createSubcategory)
    .get(getSubcategories);




router.route('/:id')
            .get(getSubcategoryValidator,getSubcategory)
            .delete(deleteSubcategoryValidator,deleteSubcategory)
            .put(updateSubcategoryValidator,updateSubcategory);

module.exports=router;