
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");
let cartModel=require('./cartModel');
let productModel=require('./productModel');

let cartItems=sequelize.define('cartItems',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        price:{
            type:DataTypes.INTEGER,
        },
        quantity:{
            type:DataTypes.INTEGER,
            defaultValue:1,
        },
        color:{
            type:DataTypes.STRING(255),
        },
    },{timestamps:true});


cartModel.hasMany(cartItems,{foreignKey:'cartId'});
cartItems.belongsTo(cartModel,{foreignKey:'cartId'});

productModel.hasMany(cartItems,{foreignKey:'productId'});
cartItems.belongsTo(productModel,{foreignKey:'productId'});

module.exports=cartItems;