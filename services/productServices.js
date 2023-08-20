let expressHandler=require('express-async-handler');
let productModel=require('../models/productModel');

let {getDoc,deleteDoc,getDocs} 
    = require('../utils/factory');
// let expressHandler=require('express-async-handler');


let prodSubModel=require('../models/product_subcatModel');
const apiError = require('../utils/apiError');
const sharp = require('sharp');
let uuid=require('uuid');

let ImageModel=require('../models/product_imagesModel.js');
let getImage=getDocs(ImageModel);

let createProduct=expressHandler(async(req,res,next)=>{
    let{subcategories,images}=req.body;
    console.log(req.body);
    let product=await productModel.create(req.body);
    
    if(!product){
        return next(new apiError('can not create product',400));
    };
    
    await Promise.all(subcategories.map((val)=>{
        prodSubModel.create({productId:product.id,subcategoryId:val})
    }));

    let url_images=[];
    if(images) {
        await Promise.all(
            images.map((val)=>{
                url_images.push(`http://localhost:4040/product/${val}`);
                return ImageModel.
                create({productId:product.id,image:val})
            })
        )
    }
    res.status(200).json({product,images:url_images})
    
});



let getProducts=getDocs(productModel,
    [
        {model:ImageModel,attributes:{
            exclude:['productId','id','updatedAt',"createdAt"]
        }}
    ]);

let deleteProduct=deleteDoc(productModel);

let getProduct=getDoc(productModel,[
    {model:ImageModel,attributes:{
        exclude:['productId','id','updatedAt',"createdAt"]
    }}
]);


let updateProduct=expressHandler(async(req,res,next)=>{
    
    let {subcategory}=req.body;
    
    let [doc]=await modelName.update(req.body,{where:{id:req.params.id}});
    
    if(!doc){
        return next(new apiError('can not update doc',400)); 
    };
    
    // add subcategory or remove it
    if(subcategory){
        
        let [row,created]=await prodSubModel.findOrCreate({
            where:{subcategoryId:subcategory,productId:req.params.id},
            defaults:{subcategoryId:subcategory,productId:req.params.id}
        });
        
        if(!created){
            await prodSubModel.destroy({
                where:{subcategoryId:subcategory,productId:req.params.id}
            });
        };
    };
    
    res.status(200).json({doc,'status':'success'});
    
});

let resizeMultipleImage=expressHandler(async(req,res,next)=>{
    if(req.files){
        // console.log(req.files);
        let filename;
        if(req.files.images){
            req.body.images=[];
            await Promise.all(req.files.images.map((img)=>{
                filename=`product-${uuid.v4()}-${Date.now()}.jpeg`;
                req.body.images.push(filename);
                return sharp(img.buffer).resize(600,600).
                toFormat('jpeg').
                jpeg({quality:90}).
                toFile(`uploads/product/${filename}`);
            }));
        };
        if(req.files.profileImage){
            filename=`product-${uuid.v4()}-${Date.now()}.jpeg`;
            req.body.profileImage=filename;
            await sharp(req.files.profileImage[0].buffer).resize(600,600).
            toFormat('jpeg').
            jpeg({quality:90}).
            toFile(`uploads/product/${filename}`);
        };
    };
    next();
});


module.exports={getProducts,createProduct,deleteProduct
    ,updateProduct,getProduct,resizeMultipleImage,getImage};