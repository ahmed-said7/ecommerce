
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");

let couponModel=sequelize.define('counpon',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        expired:{
            type:DataTypes.DATE,
            // defaultValue:DataTypes.NOW()+2*24*3600*1000,
        },
        discount:{
            type:DataTypes.INTEGER,
        }
    },{timestamps:true});

module.exports=couponModel;