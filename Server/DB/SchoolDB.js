
const { Client } = require('pg');
const ErrorHandle = require('../utils/ErrorHandler');
const { dbConfig } = require('./DBConfig');

const dbClient = new Client(dbConfig);
dbClient.connect();

const querySchoolDB = async (query, params=[], failMessage="שגיאה בביצוע הפעולה") => {
    let result = await dbClient.query(query, params)
    // If query successful
    .then((res) => {
        return res.rows;
    })
    .catch(err => {
        console.log("Error executing query\nQuery: ", query)
        console.log("Details: ", err)
        throw new ErrorHandle(failMessage)
    })

    return result;
}

module.exports.querySchoolDB = querySchoolDB;