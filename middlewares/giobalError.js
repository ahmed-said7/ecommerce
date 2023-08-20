let expressHandler = require('express-async-handler');
let globalError=expressHandler((err,req,res,next)=>{
    let status=err.statusCode || 400;
    return res.status(status).json({message:err.message,errors:err});
});

module.exports=globalError;