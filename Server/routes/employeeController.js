const empService = require('../services/employeeService');
const { ensureAuthenticated } = require('../auth/authentication')

module.exports = (app) => {
    app.get('/employees', ensureAuthenticated ,(req, res) => {
        empService.getEmployeeList().then((data) => {
            res.send(data);
        })
    })

    app.get('/employees/:id', (req, res) => {
        empService.getEmployeeById(req.params.id).then((data) => {
            res.send(data);
        })
    })

    app.post('/employees/new', (req, res) => {
        empService.createNewEmployee(req.body).then(data => {
            res.status(201).json({ message: "נוסף בהצלחה"});
        }).catch(err => {
            res.status(400).json({ message: err.message})
        });
    })

    app.get('/employees/qualif/:id', ensureAuthenticated, (req, res) => {
        empService.getEmpQualifications(req.params.id).then(data =>
            res.send(data)
        )
    })

}