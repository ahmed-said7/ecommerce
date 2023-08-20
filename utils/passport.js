let googleStraregy=require('passport-google-oauth20').Strategy;
require('dotenv').config();
let passport=require('passport');
const userModel = require('../models/userModel');



let Strategy=new googleStraregy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.SECRET_ID,
    callbackURL:'http://localhost:4040/auth/callback',
    scope:['email','profile']
}, async function(accessToken,refreshToken,profile,next){
        let data=profile._json;
        try{
            let user=await userModel.findOne({where:{email:data.email}});
            if(user){
                return next(null,user);
            }else{
                user=await userModel.create({
                    email:data.email,
                    name:data.name,
                    image:data.picture,
                    username:data.email.slice(0,data.email.indexOf('@')),
                    password:`${Math.floor(100000 + Math.random() * 900000)}`
                });
                return next(null,user);
            }
        }
        catch(err){console.log(err);}
    }
);

passport.use(Strategy);

passport.serializeUser((user,next)=>{
    return next(null,user);
});

passport.deserializeUser((user,next)=>{
    return next(null,user);
});