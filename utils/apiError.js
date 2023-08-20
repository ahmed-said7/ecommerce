class apiError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode || 400;
        this.status=`${this.statusCode}`.startsWith('4') ? 'failed' : "error" ;
    };
};

module.exports=apiError;