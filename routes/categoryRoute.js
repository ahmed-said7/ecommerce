let {createCategory,getCategories,
    getCategory,deleteCategory,
    updateCategory,resizeSingleImage}=require('../services/categoryServices');

let {updateCategoryValidator,deleteCategoryValidator
    ,createCategoryValidator,getCategoryValidator}
    =require('../validator/categoryValidator');


let {uploadSingleImage,uploadMultipleImage,}=require('../middlewares/imageMiddleware');



let router=require('express').Router();

router.route('/').post(
    createCategoryValidator,uploadSingleImage('photo'),
    resizeSingleImage,
    createCategory).get(getCategories);

router.route('/:id').get(getCategory)
        .delete(deleteCategory).put(updateCategory);

module.exports=router;