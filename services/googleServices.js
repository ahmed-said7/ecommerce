let jwt=require('jsonwebtoken');
require('dotenv').config();
let expressHandler=require('express-async-handler');
const apiError = require('../utils/apiError');



let googleLogin=expressHandler( async (req, res, next) => {
        if(!req.user){
            return next(new apiError('You must be logged in',400));
        };
        let token=jwt.sign({userId:req.user.id}
            ,process.env.JWTSECRET,{expiresIn:"3d"});
        res.status(200).json({token:token});
    });

let googleLoginFail=expressHandler( async (req, res, next) => {
        if(!req.user){
            return next(new apiError('You must be logged in',400));
        };
    });

module.exports={googleLogin,googleLoginFail};
