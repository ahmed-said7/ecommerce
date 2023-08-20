
let cityModel=require('../models/cityModel');

let {createDoc,getDoc,deleteDoc,updateDoc,getDocs} 
    = require('../utils/factory');

let createCity=createDoc(cityModel);
let getCity=getDoc(cityModel);
let deleteCity=deleteDoc(cityModel);
let updateCity=updateDoc(cityModel);
let getCities=getDocs(cityModel);

module.exports={createCity,getCities,getCity,deleteCity,updateCity};