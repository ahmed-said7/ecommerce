let expressHandler=require('express-async-handler');
let sharp=require('sharp');
let categoryModel=require('../models/categoryModel');

let {createDoc,getDoc,deleteDoc,updateDoc,getDocs} 
    = require('../utils/factory');

let createCategory=createDoc(categoryModel);
let getCategory=getDoc(categoryModel);
let deleteCategory=deleteDoc(categoryModel);
let updateCategory=updateDoc(categoryModel);
let getCategories=getDocs(categoryModel);
let uuid=require('uuid');

let resizeSingleImage=expressHandler(async(req,res,next)=>{
    if(req.file){
        let filename=`category-${Date.now()}-${uuid.v4()}.jpeg`;
        req.body.photo=filename;
        
        await sharp(req.file.buffer).resize(600,600).toFormat('jpeg')
        .jpeg({quality:90}).toFile(`uploads/category/${filename}`);
    };
    next();
});


module.exports={createCategory,getCategories,
    getCategory,deleteCategory,updateCategory,resizeSingleImage};