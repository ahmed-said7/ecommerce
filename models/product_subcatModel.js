let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");

let productModel=require('../models/productModel');
let subcategoryModel=require('../models/subcategoryModel')

let product_subcatModel=sequelize.define('product_subcat',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
    },{timestamps:true});




productModel.belongsToMany(subcategoryModel,{through:'product_subcat'});
subcategoryModel.belongsToMany(productModel,{through:'product_subcat'});




product_subcatModel.belongsTo(productModel);
productModel.hasMany(product_subcatModel);




product_subcatModel.belongsTo(subcategoryModel);
subcategoryModel.hasMany(product_subcatModel);




module.exports=product_subcatModel;