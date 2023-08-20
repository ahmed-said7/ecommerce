let user=require('./userModel');
let message=require('./messageModel');
let sequelize=require('../config/database');
let {DataTypes}=require('sequelize');

let message_user=sequelize.define('message_user',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    }
},{timestamps:true});


user.belongsToMany(message,
    { through : 'message_user'});


message.belongsToMany(user , 
    {through:'message_user'} );

module.exports=message_user;