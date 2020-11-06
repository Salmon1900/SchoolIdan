const jobService = require("../services/jobService");

module.exports = (app) => {
  app.get("/jobs", (req, res) => {
    jobService.getJobList().then((data) => {
      res.send(data);
    });
  });
};
