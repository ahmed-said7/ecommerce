let user=require('../models/userModel');
let chat=require('../models/chatModel');
let sequelize=require('../config/database');
let {DataTypes}=require('sequelize');

let chat_userModel=sequelize.define('chat_user',{
    id:{

        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },

    // userId:{
    //     type:DataTypes.INTEGER,
    //     references:{
    //         model:user,
    //         key:"id"
    //     }
    // },
    // chatId:{
    //     type:DataTypes.INTEGER,
    //     references:{
    //         model:chat,
    //         key:"id"
    //     }
    // },

},{timestamps:true});


user.belongsToMany(chat,
    { through : 'chat_user'});
chat.belongsToMany(user , 
    {through:'chat_user'} );


user.hasMany(chat_userModel);
chat_userModel.belongsTo(user);
chat.hasMany(chat_userModel);
chat_userModel.belongsTo(chat);

module.exports=chat_userModel;