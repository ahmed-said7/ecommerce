let nodemailer=require('nodemailer');

let transport=nodemailer.createTransport({
    host:"smtp.gmail.com",secure:true,port:465,
    service:"gmail",
    auth:{user:process.env.USER,pass:process.env.PASSWORD}
});

module.exports=transport;