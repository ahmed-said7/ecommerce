let express=require('express');
let app = express();

let dotenv=require('dotenv');
dotenv.config();

require('./routes')(app);
process.on('unhandledRejection',function(err) {
    console.log(err);
});

let server=app.listen(4040,()=>{
    console.log('http://localhost:4040/');
});

let io=require('socket.io')(server);
require('./socket')(io);