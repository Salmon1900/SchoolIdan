const examQueries = {
  addExam: `INSERT INTO t_exams(student_id, class_id, grade, exam_date)
              VALUES($1, $2, $3, $4)`,
  getStudentAvg: ``,
};

module.exports = examQueries;
