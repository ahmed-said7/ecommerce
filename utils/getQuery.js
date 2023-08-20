let apiFeatures=require('./apiFeatures');
let {Op}=require('sequelize')
let getQuery=(numOfDocs,queryObj,filterObj,includeArr)=>{

    let features=new apiFeatures(queryObj)
    .filter().sort().select().
    pagination(numOfDocs).searchWord();
    
    let {condition,sortArr,attributes:included,excluded,paginationObj,keyword}
        =features;
    
        let {offset,limit}=paginationObj;


    if(!keyword){
        return {
            query:
            {
            attributes:{ include : included , exclude : excluded }
            , where : {  ...condition,...filterObj},include:includeArr,
            order:sortArr ,
            offset,
            limit
            }
            ,
            paginationObj
        };
    }else{
        return {
            query:
            {
            attributes:{ include : included , exclude : excluded }
            , where : {  ...filterObj,
                ...condition, name: {[Op.like]:`%${keyword}%`}},
            order:sortArr ,
            offset,
            limit
            }
            ,
            paginationObj
        };
    };
};


module.exports=getQuery;