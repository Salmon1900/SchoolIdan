
const { Client } = require('pg');
const { dbConfig } = require('./DBConfig');

const dbClient = new Client(dbConfig);
dbClient.connect();

const querySchoolDB = async (query, params=[]) => {
    let result = await dbClient.query(query, params)
    // If query successful
    .then((res) => {
        return res.rows;
    })
    .catch(err => {
        console.log("Error executing query\nQuery: ", Query)
    })

    return result;
}

module.exports.querySchoolDB = querySchoolDB;