const { querySchoolDB } = require('../DB/SchoolDB');
const qry = require('../Queries/jobQueries');
const sql = require('../Queries/getAll.sql');

const getAllJobs = () => {
    return querySchoolDB(qry.getAllJobs);
}

const jobService = {
    getJobList: getAllJobs
}

module.exports = jobService;