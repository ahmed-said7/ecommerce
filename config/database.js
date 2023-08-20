let {Sequelize}=require('sequelize');


let sequelize=new Sequelize('commerce','root','engineer',{
    host:'localhost',
    dialect:"mysql",
});



sequelize.authenticate().then(()=>{
    console.log('Authentication successful');
}).catch((err)=>{console.log(err)});



sequelize.sync({alter:true})
.then(()=>{}).catch((err)=>{console.log(err)});

module.exports=sequelize;


