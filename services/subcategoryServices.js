let subcategoryModel=require('../models/subcategoryModel');

let {createDoc,getDoc,deleteDoc,updateDoc,getDocs} 
    = require('../utils/factory');

let uuid=require('uuid');
let sharp=require('sharp');
let expressHandler=require('express-async-handler');

let createSubcategory=createDoc(subcategoryModel);
let getSubcategory=getDoc(subcategoryModel);
let deleteSubcategory=deleteDoc(subcategoryModel);
let updateSubcategory=updateDoc(subcategoryModel);
let getSubcategories=getDocs(subcategoryModel);

let resizeSingleImage=expressHandler(async(req,res,next)=>{
    if(req.file){
        
        let filename=`subcategory-${Date.now()}-${uuid.v4()}.jpeg`;
        req.body.photo=filename;
        
        await sharp(req.file.buffer).resize(600,600).toFormat('jpeg')
        .jpeg({quality:90}).toFile(`uploads/subcategory/${filename}`);
    };
    next();
});

module.exports={createSubcategory,getSubcategories,
    getSubcategory,deleteSubcategory,updateSubcategory,resizeSingleImage};