const recordHandler = require('./record.handler');

const handleGet = async( req ) => {
    switch( req.params.get ){
        case( "recordgetall" ):
            let data = await recordHandler.getRecords();
            return data;
    }
}

const handlePost = async( req ) => {
    let data;
    switch( req.params.post ){
        case( "addrecord" ):
            data = await recordHandler.addRecord( req.body );
            return data;
        case( "editrecord" ):
            data = await recordHandler.editRecord( req.body );
            return data;
    }
}

module.exports = {
    handleGet,
    handlePost
}