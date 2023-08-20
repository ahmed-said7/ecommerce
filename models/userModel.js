
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");
let bcryptjs=require("bcryptjs"); 


let userModel=sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },

    email:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique:'email',
        validate:{
            isEmail:true,
        }
    },
    password:{
        type:DataTypes.STRING(255),
        // allowNull:false,
    },
    username:{
        type:DataTypes.STRING(255),
        // allowNull:false,
        unique:'username',
    },
    phone:{
        type:DataTypes.STRING(255),
        // allowNull:false,
    },
    image:{
        type:DataTypes.STRING(255),
        allowNull:true,
    },
    passwordResetCode:{
        type:DataTypes.STRING(255),
        allowNull:true,
    },
    passwordResetCodeExpiresAt:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    passwordResetCodeVerification:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
    },
    role:{
        type:DataTypes.ENUM("employee","customer","manager"),
        defaultValue:"customer",
    },
    },
    {
        timestamps:true
    });


userModel.addHook('beforeCreate',async function(doc){
    doc.password=await bcryptjs.hash(doc.password,10);
});

userModel.addHook('beforeUpdate',async function(doc){
    if(doc.changed('password')){
        doc.password=await bcryptjs.hash(doc.password,10);
    };
});

module.exports=userModel;