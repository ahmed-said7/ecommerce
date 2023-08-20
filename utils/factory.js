let expressHandler=require('express-async-handler');
// let categoryModel=require('./categoryModel');

const apiError = require('./apiError');


let getQuery=require('./getQuery');



let createDoc=function(modelName){
    return expressHandler(async(req,res,next)=>{
        let doc=await modelName.create(req.body);
    
        if(!doc){
            return next(new apiError('can not create doc',400)); 
        };
        res.status(200).json({doc,'status':'success'});
    });
};



let deleteDoc=function(modelName){
    return expressHandler(async(req,res,next)=>{
        
        let doc=await modelName.destroy({where:{id:req.params.id}});
        console.log(doc);
        if(!doc){
            return next(new apiError( 'can not delete doc' , 400 )); 
        };
        
        res.status(200).json({doc,'status':'success'});
    
    });
};



let updateDoc=function(modelName){
    return expressHandler(async(req,res,next)=>{
        let [doc]=await modelName.update(req.body,{where:{id:req.params.id}});
        if(!doc){
            return next(new apiError('can not update doc',400)); 
        };
        res.status(200).json({doc,'status':'success'});
    });
};



let getDoc=function(modelName,includeArr=[]){
    return expressHandler(async(req,res,next)=>{
        let doc=await modelName.
        findOne({where:{id:req.params.id},
        include:includeArr
        });
        if(!doc){
            return next(new apiError('can not get doc',400)); 
        };
        res.status(200).json({doc,'status':'success'});
    });
};



let getDocs=function(modelName,includeArr=[]){
    return expressHandler(async(req,res,next)=>{
        
        let numOfDocs=(await modelName.findAndCountAll()).count;
        
        let filterObj=req.filter;
        
        if(!filterObj){
            filterObj={};
        };
        
        let obj=getQuery(numOfDocs,req.query,filterObj,includeArr);
        
        let doc=await modelName.findAll(obj.query);
        
        if(!doc){
            return next(new apiError('can not get docs',400)); 
        };
        
        res.status(200).json({
            doc,'status':'success'
            ,pagination : obj.paginationObj});
        });
};


module.exports={createDoc,getDoc,deleteDoc,updateDoc,getDocs};