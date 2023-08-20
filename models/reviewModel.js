let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");
let productModel=require('./productModel');
let userModel=require('./userModel');

let reviewModel=sequelize.define('review',
    {
        stars:{
            type:DataTypes.INTEGER,
        },
        comment:{
            type:DataTypes.STRING(255),
            allowNull:true,
        },
        userId:{
            type:DataTypes.INTEGER,
        },
        productId:{
            type:DataTypes.INTEGER,
        },
    },
    {timestamps:true}
    );

productModel.hasMany(reviewModel,{foreignKey:"productId"});
reviewModel.belongsTo(productModel,{foreignKey:"productId"});

userModel.hasMany(reviewModel,{foreignKey:"userId"});
reviewModel.belongsTo(userModel,{foreignKey:"userId"});

module.exports=reviewModel;