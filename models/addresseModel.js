
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");
let userModel=require('./userModel');

let addresseModel=sequelize.define('addresse',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    
    name:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    city:{
        type:DataTypes.STRING(255),
    },
    phone:{type:DataTypes.STRING(255),}

    ,country:{type:DataTypes.STRING(255)},
    
    alias:{type:DataTypes.STRING(255),}
    
    ,postalCode:{type:DataTypes.STRING(255)},
    
    details:{type:DataTypes.STRING(255),}
    
    

},{timestamps:true});

userModel.hasMany( addresseModel , { foreignKey : "userId" } );
addresseModel.belongsTo(userModel,{ foreignKey : "userId" });

module.exports=addresseModel;