const db = require('../dbconnet');

const getRecords = async() => {
    try {
        let data = await db.query( 'SELECT * FROM workhours ORDER BY date' );
        return data;
    }
    catch( err ){
        return err;
    }
}

const addRecord = async( body ) => {
    try{
        let data = await db.query( 'INSERT INTO workhours ( date, team, hours, detail ) VALUES( $1, $2, $3, $4 )',[body.date, body.team, body.hours, body.detail] );
        return true;
    }
    catch( err ){
        return err;
    }
}

module.exports = {
    getRecords,
    addRecord
}