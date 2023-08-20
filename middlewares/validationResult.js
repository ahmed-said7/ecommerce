let {validationResult}=require('express-validator');

// let expressHandler=require('express-async-handler');

let validatorMiddleware=(req,res,next)=>{
    let err=validationResult(req);
    if(!err.isEmpty()){
        return res.status(200).json({
            message:err.message,errors:err
        });
    };
    next();
};

module.exports=validatorMiddleware;