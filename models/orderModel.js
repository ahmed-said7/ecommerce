
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");
let userModel=require('./userModel');

let orderModel=sequelize.define('order',
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
        
        paidAt:{type:DataTypes.DATE},
        deliveredAt:{type:DataTypes.DATE},
        
        isPaid:{type:DataTypes.BOOLEAN,defaultValue:false},
        isDelivered:{type:DataTypes.BOOLEAN,defaultValue:false},
        
    },{timestamps:true});

userModel.hasMany(orderModel,{foreignKey:'userId'});
orderModel.belongsTo(userModel,{foreignKey:'userId'});



module.exports=orderModel;