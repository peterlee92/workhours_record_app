const model = require('../models/record.models');

const getRecords = async() => {
    let data = await model.getRecords();
    return data;
}

const addRecord = async( body ) => {
    let data = await model.addRecord( body );
    return data;
}

const editRecord = async( body ) => {
    let data = await model.editRecord( body );
    return data;
}

module.exports = {
    getRecords,
    addRecord,
    editRecord
}