let {createCategory,getCategories,
    getCategory,deleteCategory,
    updateCategory,resizeSingleImage}=require('../services/categoryServices');

let {updateCategoryValidator,deleteCategoryValidator
    ,createCategoryValidator,getCategoryValidator}
    =require('../validator/categoryValidator');


let {uploadSingleImage,uploadMultipleImage,}=require('../middlewares/imageMiddleware');



let router=require('express').Router();

let {protected,allowedTo}=require('../services/authServices');
router.use(protected);

router.route('/').post(
    createCategoryValidator,uploadSingleImage('photo'),
    resizeSingleImage,
    createCategory).
    get(getCategories);

router.route('/:id')
    .get(getCategoryValidator,getCategory)
    .delete(deleteCategoryValidator,deleteCategory)
    .put(updateCategoryValidator,updateCategory);

module.exports=router;