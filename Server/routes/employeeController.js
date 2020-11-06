const empService = require("../services/employeeService");
const { ensureAuthenticated } = require("../auth/authentication");
const { checkIfAdmin } = require("../auth/roleCheck");
// const { upload } = require('../utils/fileUploader');
var multer = require("multer");
const { emp } = require("../utils/labels");
var upload = multer({ dest: process.env.FILE_PATH });

module.exports = (app, io) => {
  app.get("/employees", ensureAuthenticated, (req, res) => {
    empService.getEmployeeList().then((data) => {
      res.send(data);
    });
  });

  app.get("/employees/get/:id", ensureAuthenticated, (req, res) => {
    empService.getEmployeeById(req.params.id).then((data) => {
      res.send(data[0]);
    });
  });

  app.post("/employees/new", multer().single("profile"), async (req, res) => {
    await empService
      .createNewEmployee(req.body, req.file ? req.file.buffer : null)
      .then((data) => {
        io.sockets.emit("newEmp", {
          ...req.body,
          encode: req.file ? req.file.buffer : null,
        });
        res.status(201).json({ success: true, message: "נוסף בהצלחה" });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err.message });
      });
  });

  app.get("/employees/qualif/:id", ensureAuthenticated, (req, res) => {
    empService
      .getEmpQualifications(req.params.id)
      .then((data) => res.send(data));
  });

  app.get("/employees/classes/:id", ensureAuthenticated, (req, res) => {
    empService.getEmployeeClasses(req.params.id).then((data) => res.send(data));
  });

  app.get("/employees/classesInYear/:id/:year", ensureAuthenticated, (req, res) => {
    empService.getEmployeeClassesForYear(req.params.id, req.params.year).then((data) => res.send(data));
  });

  app.get(
    "/employees/findTeacher/:subjectId",
    ensureAuthenticated,
    checkIfAdmin,
    (req, res) => {
      empService.getQualifiedForSubject(req.params.subjectId).then((data) => {
        res.send(data);
      });
    }
  );

  app.get("/employees/teachers/hired", ensureAuthenticated, (req, res) => {
    empService.getHiredTeachers().then((data) => res.send(data));
  });

  app.get("/employees/qualif/not/:id", ensureAuthenticated, (req, res) => {
    empService.getNotQualifiedFor(req.params.id).then((data) => res.send(data));
  });

  app.get("/employees/ageGroups/:id", ensureAuthenticated, (req, res) => {
    empService
      .getEmployeeToughtAgeGroups(req.params.id)
      .then((data) => res.send(data));
  });

  app.post(
    "/employees/qualif/add",
    ensureAuthenticated,
    checkIfAdmin,
    (req, res) => {
      empService
        .addQualification(req.body.id, req.body.subjectId)
        .then((data) => {
          res
            .status(201)
            .json({ success: true, message: "ההסמכה נוספה בהצלחה" });
        })
        .catch((err) => {
          res.status(400).json({ success: false, message: err.message });
        });
    }
  );

  app.delete(
    "/employees/qualif/remove",
    ensureAuthenticated,
    checkIfAdmin,
    (req, res) => {
      empService
        .removeQualification(req.body.id, req.body.subjectId)
        .then((data) => {
          res
            .status(201)
            .json({ success: true, message: "ההסמכה הוסרה בהצלחה" });
        })
        .catch((err) => {
          res.status(400).json({ success: false, message: err.message });
        });
    }
  );

  app.put(
    "/employees/fire/:id",
    ensureAuthenticated,
    checkIfAdmin,
    (req, res) => {
      empService
        .fireTeacherById(req.params.id)
        .then((data) => {
          res.status(200).json({ success: true, message: "העובד פוטר בהצלחה" });
        })
        .catch((err) => {
          res.status(400).json({ success: false, message: err.message });
        });
    }
  );
};
