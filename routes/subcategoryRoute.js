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

router.route('/').
    post(createSubcategoryValidator,uploadSingleImage('photo'),
    resizeSingleImage,createSubcategory).get(getSubcategories);
router.route('/:id').get(getSubcategory)
            .delete(deleteSubcategory).put(updateSubcategory);

module.exports=router;