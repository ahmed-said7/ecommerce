
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");


let categoryModel=sequelize.define('category',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    
    name:{
        type:DataTypes.STRING(255),
        allowNull:true
    },
    photo:{
        type:DataTypes.STRING(255),
        allowNull:true
    },
    slug:{
        type:DataTypes.STRING(255),
        allowNull:true
    },

}
    ,{timestamps:true}
);

// countryModel.hasMany( cityModel , { foreignKey : "country_id" } );
// cityModel.belongsTo(countryModel);

module.exports=categoryModel;