const subjectQueries = {
  getAllSubjects: "SELECT * FROM t_subjects",
  getSubjectById: "SELECT * FROM t_subjects WHERE subject_id = $1",
  getSubjectByName: "SELECT * FROM t_subjects WHERE subject_name = $1",
  getActive: "SELECT * FROM t_subjects WHERE isactive = true",
  deactivateById:
    "UPDATE t_subjects SET isactive = false WHERE subject_id = $1",
  activateById: "UPDATE t_subjects SET isactive = true WHERE subject_id = $1",
  addNewSubject: "INSERT INTO t_subjects(subject_name) VALUES ($1)",
  getClassesBySubject: "SELECT * FROM t_classes WHERE subject_id = $1",
};

module.exports = subjectQueries;
