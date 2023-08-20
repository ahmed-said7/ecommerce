let multer = require('multer');
let apiError = require('../utils/apiError');

let uploadImage=function(){
    let filter=function(req,file,next){
        if(file.mimetype.startsWith('image')){
            return next(null,true);
        }else{
            return next(new apiError('Invalid file',400).false);
        };
    };
    return multer( {storage:multer.memoryStorage(),fileFilter:filter} );
};

let uploadSingleImage=(field)=>{
    return uploadImage().single(field);
};

let uploadMultipleImage=(fields)=>{
    return uploadImage().fields(fields);
};

module.exports={uploadSingleImage,uploadMultipleImage};