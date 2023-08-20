let {createReview,getReviews,
    getReview,deleteReview,updateReview,
    setUserIdToBody,setFilterObj}=require('../services/reviewServices');

let router=require('express').Router({mergeParams:true});

let {protected,login}=require('../services/authServices');

let {updateReviewValidator,createReviewValidator
    ,deleteReviewValidator,getReviewValidator}
    =require('../validator/reviewValidator');

router.use(protected);

router.route('/').post(createReviewValidator,setUserIdToBody,createReview).
    get(setFilterObj,getReviews);
router.route('/:id')
    .get(getReview)
    .delete(deleteReviewValidator,deleteReview).put(updateReviewValidator,updateReview);


// router.route('/rev').post(setUserIdToBody,createReview).get(getReviews);

module.exports=router;