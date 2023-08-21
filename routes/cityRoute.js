let router=require('express').Router();
let {createCity,getCities,getCity,deleteCity,updateCity}=require('../services/cityServices');

let {updateCityValidator,createCityValidator
    ,deleteCityValidator,getCityValidator}=
    require('../validator/cityValidator');

let {protected,allowedTo}=require('../services/authServices');
router.use(protected);


router.route('/')
    .post(createCityValidator,createCity).
    get(getCities);


router.route('/:id')
    .get(getCityValidator,getCity)
    .delete(deleteCityValidator,deleteCity)
    .put(updateCityValidator,updateCity);


module.exports=router;