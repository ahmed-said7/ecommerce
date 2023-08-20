let router=require('express').Router();
const passport=require('passport');
let {googleLogin,googleLoginFail}=require('../services/googleServices');
router.route('/login').
    get(passport.authenticate('google',{scope:['email','profile']}));

router.route('/callback').
    get(passport.authenticate('google',{
        successRedirect:'http://localhost:4040/auth/login/success',
        failureRedirect:'http://localhost:4040/auth/login/failure'
    }))

router.route('/login/success').get(googleLogin);
router.route('/login/failure').get(googleLoginFail);

module.exports = router;