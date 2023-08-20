
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");



let contactModel=sequelize.define('contact',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    phone:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    message:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    status:{
        type:DataTypes.ENUM('active','pending','rejected'),
        defaultValue:"pending",
    },
    

},{timestamps:true});



let userModel=require('../models/userModel');

userModel.hasMany(contactModel,{foreignKey:"userId"});
contactModel.belongsTo(userModel,{foreignKey:"userId"});

module.exports=contactModel;