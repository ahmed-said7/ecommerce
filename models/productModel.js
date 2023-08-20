
let sequelize=require('../config/database');
let {DataTypes}=require("sequelize");
let brandModel=require('./brandModel');
let categoryModel=require('./categoryModel');
let {uploadSingleImage,uploadMultipleImage}
    =require('../middlewares/imageMiddleware');


let productModel=sequelize.define('product',{
    
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    
    name:{
        type:DataTypes.STRING(255)
    },
    
    price:{
        type:DataTypes.INTEGER,
        // allowNull:false
    },
    
    profileImage:{
        type:DataTypes.STRING(255),
    },
    
    averageRating:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    
    sold:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    
    quantity:{
        type:DataTypes.INTEGER,
        defaultValue:4
    },
    
    description:{
        type:DataTypes.STRING(255)
    }
    

},{timestamps:true});

brandModel.hasMany( productModel , { foreignKey:'brandId'}  );
productModel.belongsTo(brandModel, { foreignKey:'brandId'});

categoryModel.hasMany( productModel , { foreignKey : 'categoryId'}  );
productModel.belongsTo(categoryModel , { foreignKey : 'categoryId'});

let getDocImageUrl=(doc)=>{
    let url;
    if(doc.images?.length>0){
        
        doc.images.forEach((img)=>{
            url=`http://localhost:4040/product/${img.image}`;
            img.image=url;
            
        });
    };
}

productModel.afterFind(async(docs)=>{
    
    if(docs.length>0){
        docs.forEach((doc)=>{
            getDocImageUrl(doc);
        });
    }
    else{
        getDocImageUrl(docs);
    }
});

module.exports=productModel;