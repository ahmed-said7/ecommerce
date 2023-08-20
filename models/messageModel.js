
let sequelize=require('../config/database');

let {DataTypes}=require("sequelize");

let chat_userModel=require('./chat_userModel');


let messageModel=sequelize.define('message',
    {
        text:{
            type:DataTypes.STRING(255),
        },
        media:{
            type:DataTypes.STRING(255),
        },
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        
        },
        
    {timestamps:true});




chat_userModel.hasMany(messageModel , 
    { foreignKey : 'chatUserId' })

messageModel.belongsTo(chat_userModel,{ foreignKey : 'chatUserId' });

module.exports =messageModel;