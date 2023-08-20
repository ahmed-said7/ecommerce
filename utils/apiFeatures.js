
let {Op}=require('sequelize');

class apiFeatures {


    constructor(queryObj){
        this.queryObj = queryObj;
        this.condition={};
        this.sortArr=[];
        this.attributes=[];
        this.excluded=[];
        this.paginationObj={};
        this.keyword='';
    };




    filter(){
        let queryObject = {...this.queryObj};
        let excludedFields=['page','limit','select','sort','keyword'];
        excludedFields.forEach((field)=>{delete queryObject[field];});
        Object.entries(queryObject).forEach((Value)=>{
            let [key,value]=Value;
            this.operatorFunc(key,value);
        });
        return this;
    };



    switchFunc(valKey,value,obj){
        switch(valKey){
            case 'gte':
                obj[Op.gte]=value[valKey];
                break;
            case 'gt':
                obj[Op.gt]=value[valKey];
                break;
            case 'lt':
                obj[Op.lt]=value[valKey];
                break;
            case 'lte':
                obj[Op.lte]=value[valKey];
                break;
            case 'ne':
                obj[Op.ne]=value[valKey];
                break;
            case 'eq':
                obj[Op.eq]=value[valKey];
                break;
            default:
                obj[Op.eq]=valKey;
        };
    };



    operatorFunc(key,value){
        if(typeof(value)=='object'){
            let obj={};
            Object.keys(value).forEach((valKey)=>{
                this.switchFunc( valKey , value , obj )
            });
            this.condition[key]=obj;
        
        }else{
            this.condition[key]=value;
        };
    
    };



    sort(){
        if(this.queryObj.sort){
            let sortArr=this.queryObj.sort.split(",");
            sortArr.forEach((ele)=>{
                if(ele.startsWith('-')){
                    this.sortArr.push([ele.slice(1),'ASC']);
                }else{
                    this.sortArr.push([ele,'DESC']);
                };
            });
        }else {
            this.sortArr.push(['createdAt','ASC']);
        };
        return this;
    };



    select(){
        if(this.queryObj.select){
            let selectArr=this.queryObj.select.split(",");
            selectArr.forEach((ele)=>{
                if(ele.startsWith('-')){
                    this.excluded.push(ele.slice(1));
                }else{
                    this.attributes.push(ele);
                };
            });
        };
        return this;
    };



    pagination(NumOfDocs){
        let page= +this.queryObj.page || 1;
        let limit= +this.queryObj.limit || 10;
        let offset=(page-1)*limit;
        this.paginationObj.limit=limit;
        this.paginationObj.currentPage=page;
        this.paginationObj.offset=offset;
        let NumOfPages=Math.ceil( NumOfDocs / limit );
        this.paginationObj.NumOfPages=NumOfPages;
        if(page < NumOfPages){
            this.paginationObj.nextPage= page + 1;
        };
        if(page > 1){
            this.paginationObj.prePage=page-1;
        };
        return this;
    };



    searchWord(){
        if(this.queryObj.keyword){
            this.keyword = this.queryObj.keyword;
        };
        return this;
    };



};

module.exports=apiFeatures;