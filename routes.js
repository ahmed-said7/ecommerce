let globalError=require('./middlewares/giobalError');
let apiError=require('./utils/apiError');
let express=require('express');
let cors=require('cors');
let passport=require('passport');
let Session=require('express-session');
let mysqlStore=require('express-mysql-session')(Session);

let cityRouter=require('./routes/cityRoute');
let userRouter=require('./routes/userRoute');
let chatRouter=require('./routes/chatRoute');
let messageRouter=require('./routes/messageRoute');
let categoryRoute=require('./routes/categoryRoute');
let subcategoryRoute=require('./routes/subcategoryRoute');
let brandRoute=require('./routes/brandRoute');
let productRoute=require('./routes/productRoute');
let reviewRoute=require('./routes/reviewRoute');
let cartRoute=require('./routes/cartRoute');
let couponRoute=require('./routes/couponRoute');
let wishlistRoute=require('./routes/wishlistRoute');
let orderRoute=require('./routes/orderRoute');
let googleRoute=require('./routes/googleRoute');
let {webhookSession}=require('./services/orderServices');

let routes=(app)=>{

    app.use(cors({origin:"*"}));
    app.use(express.json());
    app.use(express.static('uploads'));
    app.post('/webhook',express.raw({ type: 'application/json' }),webhookSession);

    const options ={
        connectionLimit: 10,
        password: process.env.DB_PASS,
        user: process.env.DB_USER,
        database: process.env.MYSQL_DB,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        createDatabaseTable: true
    }
    const  sessionStore = new mysqlStore(options);


    app.use(Session({
        saveUninitialized:true,
        resave:false,
        secret:'some secret',
        cookie:{maxAge:1000*3*24*3600},
        store:sessionStore
    }
    ));


    require('./utils/passport');
    app.use(passport.initialize());
    app.use(passport.session());



    app.use('/city',cityRouter);
    app.use('/user',userRouter);
    app.use('/chat',chatRouter);
    app.use('/message',messageRouter);
    app.use('/category',categoryRoute);
    app.use('/product',productRoute);
    app.use('/subcategory',subcategoryRoute);
    app.use('/brand',brandRoute);
    app.use('/review',reviewRoute);
    app.use('/cart',cartRoute);
    app.use('/coupon',couponRoute);
    app.use('/wishlist',wishlistRoute);
    app.use('/order',orderRoute);
    app.use('/auth',googleRoute);

    app.all('*' , ( req , res , next ) => {
        next(new apiError('can not find route',400)) ;
    });

    app.use(globalError);

    };

module.exports=routes