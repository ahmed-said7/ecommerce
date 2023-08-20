let router=require('express').Router();
let {createCity,getCities,getCity,deleteCity,updateCity}=require('../services/cityServices');

router.route('/').post(createCity).get(getCities);
router.route('/:id').get(getCity)
    .delete(deleteCity).put(updateCity);
module.exports=router;