
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");
let categoryModel=require('./categoryModel');

let subcategoryModel=sequelize.define('subcategory',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    photo:{
        type:DataTypes.STRING(255),
    },
    name:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    
    
},{timestamps:true});

// countryModel.hasMany( cityModel , { foreignKey : "country_id" } );
// cityModel.belongsTo(countryModel);

categoryModel.hasMany(subcategoryModel , {foreignKey:"categoryId"});

subcategoryModel.belongsTo(categoryModel , {foreignKey:"categoryId"});

module.exports=subcategoryModel;