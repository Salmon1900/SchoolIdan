const empService = require('../services/employeeService');
const { ensureAuthenticated } = require('../auth/authentication')
const { checkIfAdmin } = require('../auth/roleCheck')
// const { upload } = require('../utils/fileUploader');
var multer  = require('multer')
var upload = multer({ dest: process.env.FILE_PATH })

module.exports = (app) => {
    app.get('/employees', ensureAuthenticated ,(req, res) => {
        empService.getEmployeeList().then((data) => {
            res.send(data);
        })
    })

    app.get('/employees/:id', ensureAuthenticated, (req, res) => {
        empService.getEmployeeById(req.params.id).then((data) => {
            res.send(data);
        })
    })

    // app.post("/upload", {
    //     upload(req, res, {(err) => {
    //         console.log("Request ---", req.body);
    //         console.log("Request file ---", req.file);//Here you get file.
    //         /*Now do where ever you want to do*/
    //         if(!err){
    //             return res.send(200).end();
    //         }
    //      })}
    //  });

    app.post('/employees/new2', upload.single('profile'), (req, res) => {
        console.log(req.body);
        console.log(req.file);
        console.log(req.file.buffer);

        console.log(req.headers)
        empService.createNewEmployee(req.body, req.file).then(data => {
            res.status(201).json({ success: true, message: "נוסף בהצלחה"});
        }).catch(err => {
            res.status(400).json({ success: false, message: err.message})
        });
    } )

    // app.post('/employees/new2', (req, res) => {
    //     upload(req, res,  (err) => {
    //         console.log(req.body);
    //         console.log(req.file);//Here you get file.
    //         /*Now do where ever you want to do*/
    //         if(!err) {
    //             return res.send(200).end();
    //         }
    //     })
    // })


    app.post('/employees/new', (req, res) => {
        empService.createNewEmployee(req.body).then(data => {
            res.status(201).json({ success: true, message: "נוסף בהצלחה"});
        }).catch(err => {
            res.status(400).json({ success: false, message: err.message})
        });
    })

    app.get('/employees/qualif/:id', ensureAuthenticated, (req, res) => {
        empService.getEmpQualifications(req.params.id).then(data =>
            res.send(data)
        )
    })

    app.get('/employees/findTeacher/:subjectId', ensureAuthenticated, checkIfAdmin, (req, res)=> {
        empService.getQualifiedForSubject(req.params.subjectId).then(data => {
            res.send(data);
        })
    })

}