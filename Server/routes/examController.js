const examService = require("../services/examService");
const { ensureAuthenticated } = require("../auth/authentication");

module.exports = (app) => {
  app.post("/exams/add", ensureAuthenticated, (req, res) => {
    examService
      .addNewExamRec(req.body)
      .then((data) => {
        res.status(201).json({ success: true, message: "ציון נשמר" });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err.message });
      });
  });

  app.get("/exams/teacher/avg/:id/:year", ensureAuthenticated, (req, res) => {
    examService
      .getTeachersStudentsAvrageGrade(req.params.id, req.params.year)
      .then((data) => res.send(data));
  });

  app.get("/exams/teacher/class/:classId", ensureAuthenticated, (req, res) => {
    examService
      .getClassGrades(req.params.classId)
      .then((data) => res.send(data));
  });

  app.get(
    "/exams/teacher/subject/:teacherId/:subjectId/:year",
    ensureAuthenticated,
    (req, res) => {
      examService
        .getTeachersSubjectGrades(req.params.teacherId, req.params.subjectId, req.params.year)
        .then((data) => res.send(data));
    }
  );

  app.get(
    "/exams/teacher/age/:teacherId/:ageGroup/:year",
    ensureAuthenticated,
    (req, res) => {
      examService
        .getTeachersAgeGroupGrades(req.params.teacherId, req.params.ageGroup, req.params.year)
        .then((data) => res.send(data));
    }
  );
};
