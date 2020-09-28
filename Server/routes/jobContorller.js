const jobService = require('../services/jobService');
const router = require('express').Router()

// router.get('/jobs', (req, res) => {
//     jobService.getJobList().then((data) => {
//         res.send(data);
//     })
// })
module.exports = (app) => {
    app.get('/jobs', (req, res) => {
        jobService.getJobList().then((data) => {
            res.send(data);
        })
    })
}