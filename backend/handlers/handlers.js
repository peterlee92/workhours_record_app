const recordHandler = require('./record.handler');

const handleGet = async( req ) => {
    switch( req.params.get ){
        case( "recordgetall" ):
            let data = await recordHandler.getRecords();
            return data;
    }
}

const handlePost = async( req ) => {
    switch( req.params.post ){
        case( "addrecord" ):
            console.log('added work');
            let data = await recordHandler.addRecord( req.body );
            return data;
    }
}

module.exports = {
    handleGet,
    handlePost
}