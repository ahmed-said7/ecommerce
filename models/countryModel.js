
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");

let countryModel=sequelize.define('country',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING(255),
            allowNull:false,
        }
    },{timestamps:true});

module.exports=countryModel;