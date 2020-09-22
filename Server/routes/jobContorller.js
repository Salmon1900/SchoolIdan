const jobService = require('../services/jobService');
const service = require('../services/jobService');

module.exports = (app) => {
    app.get('/jobs', (req, res) => {
        service.getJobList().then((data) => {
            res.send(data);
        })
    })
}