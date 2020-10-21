const { ensureAuthenticated } = require("../auth/authentication");
const { checkIfAdmin } = require("../auth/roleCheck");
const subjectService = require("../services/subjectService");

module.exports = (app) => {
  // Get all subjects
  app.get("/subjects/all", ensureAuthenticated, (req, res) => {
    subjectService.getAllSubjects().then((data) => {
      res.send(data);
    });
  });

  // Get subject by id
  app.get("/subjects/get/:id", ensureAuthenticated, (req, res) => {
    subjectService.getSubjectById(req.params.id).then((data) => {
      res.send(data[0]);
    });
  });

  // Get all active subjects
  app.get("/subjects/active", ensureAuthenticated, (req, res) => {
    subjectService.getActive().then((data) => {
      res.send(data);
    });
  });

  // Deactivate subject by id
  app.put(
    "/subjects/deactivate/:id",
    ensureAuthenticated,
    checkIfAdmin,
    (req, res) => {
      subjectService
        .deactivateById(req.params.id)
        .then(() => {
          res.status(201).json({ success: true, message: "מקצוע נמחק בהצלחה" });
        })
        .catch((err) => {
          res.status(400).json({ success: true, message: err.message });
        });
    }
  );

  // Add new subject
  app.post("/subjects/new", ensureAuthenticated, checkIfAdmin, (req, res) => {
    subjectService
      .addNewSubejct(req.body.name)
      .then(() => {
        res.status(201).json({ success: true, message: "מקצוע נוסף בהצלחה" });
      })
      .catch(() => {
        res.status(400).json({ success: true, message: "שגיאה בהוספת מקצוע" });
      });
  });
};
