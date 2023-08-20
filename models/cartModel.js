
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");
let userModel=require('./userModel');

let cartModel=sequelize.define('cart',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        totalPriceAfterDiscount:
        {type:DataTypes.INTEGER},
        totalPrice:
        {type:DataTypes.INTEGER},

    },{timestamps:true});


userModel.hasMany(cartModel,{foreignKey:'userId'});
cartModel.belongsTo(userModel,{foreignKey:'userId'});



module.exports=cartModel;