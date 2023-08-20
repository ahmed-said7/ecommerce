
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");

let chatModel=sequelize.define('city',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    }
    ,{
        timestamps:true
    });


module.exports=chatModel;