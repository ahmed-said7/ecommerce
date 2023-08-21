
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");
let countryModel=require('./countryModel');

let cityModel=sequelize.define('city',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    
    name:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    
    

},{timestamps:true});

countryModel.hasMany( cityModel , { foreignKey : "countryId" } );
cityModel.belongsTo(countryModel,{ foreignKey : "countryId" });

module.exports=cityModel;