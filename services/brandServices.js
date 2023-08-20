let brandModel=require('../models/brandModel');

let {createDoc,getDoc,deleteDoc,updateDoc,getDocs} 
    = require('../utils/factory');

let createBrand=createDoc(brandModel);
let getBrand=getDoc(brandModel);
let deleteBrand=deleteDoc(brandModel);
let updateBrand=updateDoc(brandModel);
let getBrands=getDocs(brandModel);

let expressHandler=require('express-async-handler');

let resizeSingleImage=expressHandler(async(req,res,next)=>{
    if(req.file){
        let filename=`brand-${Date.now()}-${uuid.v4()}.jpeg`;
        req.body.photo=filename;
        
        await sharp(req.file.buffer).resize(600,600).toFormat('jpeg')
        .jpeg({quality:90}).toFile(`uploads/brand/${filename}`);
    };
    next();
});

module.exports={createBrand,getBrands,
    getBrand,deleteBrand,updateBrand,resizeSingleImage};