let sequelize=require('../config/database');

let {DataTypes}=require("sequelize");

let productModel=require('../models/productModel')

let imageModel=sequelize.define('image',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    
    image:{
        type:DataTypes.STRING(255),
        // allowNull:false,
    },
    

},{timestamps:true});


productModel.hasMany(imageModel,{foreignKey:'productId'});

imageModel.belongsTo(productModel,{foreignKey:'productId'});

module.exports=imageModel;