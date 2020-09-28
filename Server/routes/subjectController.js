const subjectService = require('../services/subjectService');

module.exports = (app) => {
    app.get('/subjects/all', (req, res) => {
        subjectService.getAllSubjects().then(data => {
            res.send(data);
        })
    })

    app.get('/subjects/:id', (req, res) => {
        subjectService.getSubjectById(req.params.id).then(data => {
            res.send(data);
        })
    })
}
