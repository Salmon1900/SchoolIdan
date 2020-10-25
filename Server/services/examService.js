const { querySchoolDB } = require("../DB/SchoolDB");
const qry = require("../Queries/examQueries");
const studentService = require("./studentService");
const classService = require("./classService");
const { newExamValid } = require("./validation/examValidation");
const labels = require("../utils/labels");

const addNewExamRec = async (exam) => {
  // validate Student exists
  let student = await studentService.getStudentById(exam.studentId);
  // validate class exist and active?
  let classObj = await classService.getClassById(exam.classId);
  // check student in class
  let studentListing = await classService.getListing(
    exam.classId,
    exam.studentId
  );
  // validate grade number and between 0 - 100

  const valid = await newExamValid(
    student[0],
    classObj[0],
    studentListing,
    exam.grade
  );

  if (!valid.isValid) {
    let failReason = new ErrorHandle(labels.exm.cannontAdd);
    failReason.add(valid.reason);
    throw failReason;
  }

  let examDetails = [exam.studentId, exam.classId, exam.grade, exam.examDate];
  return querySchoolDB(qry.addExam, examDetails);
};

const examService = {
  addNewExamRec,
};

module.exports = examService;
