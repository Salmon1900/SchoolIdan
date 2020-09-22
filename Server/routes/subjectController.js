const service = require('../services/subjectService');

module.exports = (app) => {
    app.get('/subjects/all', (req, res) => {
        service.getAllSubjects().then(data => {
            res.send(data);
        })
    })

    app.get('/subjects/:id', (req, res) => {
        service.getSubjectById(req.params.id).then(data => {
            res.send(data);
        })
    })
}
