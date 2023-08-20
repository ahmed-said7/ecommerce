
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");
let userModel=require('./userModel');
let productModel=require('./productModel');

let wishlistModel=sequelize.define('wishlist',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        }
    },{timestamps:true});

userModel.belongsToMany(productModel,{through:'wishlist'});
productModel.belongsToMany(userModel,{through:'wishlist'});


module.exports=wishlistModel;