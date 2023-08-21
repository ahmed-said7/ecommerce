
let countryModel=require('../models/countryModel');

let {createDoc,getDoc,deleteDoc,updateDoc,getDocs} 
    = require('../utils/factory');

let createCountry=createDoc(countryModel);
let getCountry=getDoc(countryModel);
let deleteCountry=deleteDoc(countryModel);
let updateCountry=updateDoc(countryModel);
let getCountries=getDocs(countryModel);

module.exports={createCountry,getCountries,getCountry,deleteCountry,updateCountry};