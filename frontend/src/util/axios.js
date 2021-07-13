const axios = require('axios');
const host = 'http://localhost:7000/api/';

const ax = async(type, param, data) => {
    if( type === 'get' ){
        try{
            let resp = await axios( host + param );
            return resp.data;
        }
        catch( err ){
            console.log( err.message );
            return false;
        }
    }
    else if( type === 'post' ){
        try{
            let resp = await axios.post( host + param, data);
            return resp.data;
        }
        catch( err ){
            console.log( err.message );
            return false;
        }
    }
}

module.exports = ax;