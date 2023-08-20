
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");
let orderModel=require('./orderModel');
let productModel=require('./productModel');

let orderItems=sequelize.define('orderItems',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        price:{
            type:DataTypes.NUMBER(255),
        },
        quantity:{
            type:DataTypes.INTEGER,
            defaultValue:1,
        },
        color:{
            type:DataTypes.STRING(255),
        },
    },{timestamps:true});


orderModel.hasMany(orderItems,{foreignKey:'orderId'});
orderItems.belongsTo(orderModel,{foreignKey:'orderId'});

productModel.hasMany(orderItems,{foreignKey:'productId'});
orderItems.belongsTo(productModel,{foreignKey:'productId'});

module.exports=orderModel;