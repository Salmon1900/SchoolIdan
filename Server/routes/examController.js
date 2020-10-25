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
};
