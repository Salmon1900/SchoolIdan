const { ensureAuthenticated } = require("../auth/authentication");
const { checkIfAdmin } = require("../auth/roleCheck");
const studentService = require("../services/studentService");

module.exports = (app) => {
  app.get("/students/get/all", ensureAuthenticated, (req, res) => {
    studentService.getAllStudents().then((data) => {
      res.send(data);
    });
  });

  app.get("/students/get/:id", ensureAuthenticated, (req, res) => {
    studentService.getStudentById(req.params.id).then((data) => {
      res.send(data[0]);
    });
  });

  app.get(
    "/students/get/age-group/:birthYear",
    ensureAuthenticated,
    (req, res) => {
      studentService.getStudentAgeGroup(req.params.birthYear).then((data) => {
        res.send(data);
      });
    }
  );

  app.get("/students/:id/listings", ensureAuthenticated, (req, res) => {
    studentService.getStudentListings(req.params.id).then((data) => {
      res.send(data);
    });
  });

  app.delete(
    "/students/delete/:id",
    ensureAuthenticated,
    checkIfAdmin,
    (req, res) => {
      studentService
        .deleteStudentById(req.params.id)
        .then((data) => {
          res
            .status(200)
            .json({ success: true, message: "התלמיד נמחק בהצלחה" });
        })
        .catch((err) => {
          res.status(400).json({ success: false, message: err.message });
        });
    }
  );

  app.post("/students/new", ensureAuthenticated, checkIfAdmin, (req, res) => {
    studentService
      .addNewStudent(req.body)
      .then((data) => {
        res.status(200).json({ success: true, message: "התלמיד נוצר בהצלחה" });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err.message });
      });
  });
};
