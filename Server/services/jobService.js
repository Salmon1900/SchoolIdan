const { querySchoolDB } = require("../DB/SchoolDB");
const qry = require("../Queries/jobQueries");

const getAllJobs = () => {
  return querySchoolDB(qry.getAllJobs);
};

const jobService = {
  getJobList: getAllJobs,
};

module.exports = jobService;
