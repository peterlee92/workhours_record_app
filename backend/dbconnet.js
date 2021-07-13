const { Client } = require('pg');
require('dotenv').config();

const dbconfig = {
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    host: 'localhost',
    port: '5432',
    database: "record_work_hour"
};

let exp = {
    query:async (q, d) => {
        var client = new Client( dbconfig );
        await client.connect();
        try{
            var results = await client.query( q, d );
            return results.rows;
        }
        catch(err){
            throw err;
        }
    }
}

module.exports = exp;