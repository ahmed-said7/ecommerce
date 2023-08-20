
let sequelize=require('../config/database');

let {DataTypes}=require("sequelize");



let brandModel=sequelize.define('brand',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    
    name:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    photo:{
        type:DataTypes.STRING(255),
    }

},{timestamps:true});

// countryModel.hasMany( cityModel , { foreignKey : "country_id" } );
// cityModel.belongsTo(countryModel);

module.exports=brandModel;