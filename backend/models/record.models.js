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
        let data = await db.query( 'INSERT INTO workhours ( date, team, hours, detail ) VALUES( $1, $2, $3, $4 )',[ body.date, body.team, body.hours, body.detail ] );
        return true;
    }
    catch( err ){
        return err;
    }
}

const editRecord = async( body ) => {
    try{
        let data = await db.query( 'UPDATE workhours SET date = $1, team = $2, hours = $3, detail = $4 WHERE id = $5', [ body.date, body.team, body.hours, body.detail, body.id ] );
        return true;
    }
    catch( err ){
        return err;
    }
}

module.exports = {
    getRecords,
    addRecord,
    editRecord
}