const { ensureAuthenticated } = require('../auth/authentication');
const { checkIfAdmin } = require('../auth/roleCheck');
const classService = require('../services/classService');

module.exports = (app) => {
    app.get('/classes/all', ensureAuthenticated, checkIfAdmin, (req, res) => {
        classService.getAllClasses().then(data => {
            res.send(data)
        })
    })

    app.get('/classes/active', ensureAuthenticated, checkIfAdmin, (req, res) => {
        classService.getActiveClasses().then(data => {
            res.send(data)
        })
    })

    app.get('/classes/get/:id', ensureAuthenticated, (req, res) => {
        classService.getClassById(req.params.id).then(data => {
            res.send(data)
        })
    })

    app.get('/classes/get/students/:classId', ensureAuthenticated, (req, res) => {
        classService.getStudentsInClass(req.params.classId).then(data => {
            res.send(data)
        })
    })

    app.post('/classes/students/add/single', ensureAuthenticated, (req, res) => {
        classService.addStudentToClass(req.body.classId, req.body.studentId).then(data =>{
            res.status(200).json({success: true, message: "התלמיד נוסף לכיתה בהצלחה"})
        }).catch((err) => {
            res.status(400).json({success: false, message: err.message})
        })
    })

    app.post('/classes/students/add/list', ensureAuthenticated, (req, res) => {
        classService.addStudentListToClass(req.body.classId, req.body.studentList).then(data =>{
            res.status(200).json({success: true, message: "התלמידים נוספו לכיתה בהצלחה"})
        }).catch((err) => {
            res.status(400).json({success: false, message: err.message})
        })
    })

    app.put('/classes/deactivate/:id', ensureAuthenticated, checkIfAdmin, (req, res) => {
        classService.deactivateClass(req.params.id).then(() => {
            res.status(200).json({success: true, message: "הכיתה הושבתה בהצלחה"})
        }).catch((err) => {
            res.status(400).json({success: false, message: err.message})
        })
    })
    
    app.put('/classes/activate/:id', ensureAuthenticated, checkIfAdmin, (req, res) => {
        classService.activateClass(req.params.id).then(() => {
            res.status(200).json({success: true, message: "הכיתה הופעלה בהצלחה"})
        }).catch((err) => {
            res.status(400).json({success: false, message: err.message})
        })
    })

    app.delete('/classes/delete/:id', ensureAuthenticated, checkIfAdmin, (req, res) => {
        classService.deleteClass(req.params.id).then(() => {
            res.status(200).json({success: true, message: "הכיתה נמחקה בהצלחה"})
        }).catch((err) => {
            res.status(400).json({success: false, message: err.message})
        })
    })

    app.post('/classes/new', ensureAuthenticated, (req, res) => {
        classService.addNewClass(req.body).then(() => {
            res.status(200).json({success: true, message: "הכיתה נוצרה בהצלחה"})
        }).catch((err) => {
            res.status(400).json({success: false, message: err.message})
        })
    })
}