let {createCountry,getCountries,
    getCountry,deleteCountry,updateCountry}
    =require('../services/countryServices');


let {updateCountryValidator,createCountryValidator
    ,deleteCountryValidator,getCountryValidator}
    =require('../services/countryServices');




let router=require('express').Router();
    
let {protected,allowedTo}=require('../services/authServices');
router.use(protected);


router.route('/')
    .post(createCountryValidator,createCountry)
    .get(getCountries);

router.route('/:id')
    .get(getCountryValidator,getCountry).
    delete(deleteCountryValidator,deleteCountry).
    put(updateCountryValidator,updateCountry);


module.exports=router;