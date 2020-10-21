const { querySchoolDB } = require("../DB/SchoolDB");
const qry = require("../Queries/studentQueries");
const ErrorHandle = require("../utils/ErrorHandler");
const labels = require("../utils/labels");
const { newStudentValid } = require("./validation/studentValidation");

const getAllStudents = () => {
  return querySchoolDB(qry.getAll);
};

const getStudentById = (id) => {
  return querySchoolDB(qry.getById, [id]);
};

const getStudentsByBirthYear = (birthYear) =>
  querySchoolDB(qry.getStudentsByBirthYear, [birthYear]);

const deleteStudentById = async (id) => {
  // Check if request data correlates with db
  let studentsWithId = await getStudentById(id);
  if (!studentsWithId.length) {
    let failReason = new ErrorHandle(labels.stud.cannotDelete);
    failReason.add(labels.stud.doesNotExist);
    throw failReason;
  }

  await querySchoolDB(qry.deleteListingsById, [id]);
  return querySchoolDB(qry.deleteById, [id]);
};

const addNewStudent = async (student) => {
  // Check if request data passes rules
  let studentValidation = newStudentValid({
    id: student.id,
    name: student.name,
    birthYear: student.birthYear,
  });

  if (!studentValidation.isValid) {
    let failReason = new ErrorHandle(labels.stud.cannotAdd);
    failReason.add(studentValidation.reason);
    throw failReason;
  }

  // Check if request data correlates with db
  let studentsWithId = await getStudentById(student.id);
  if (studentsWithId.length) {
    let failReason = new ErrorHandle(labels.stud.cannotAdd);
    failReason.add(labels.stud.idTaken);
    throw failReason;
  }

  return querySchoolDB(qry.addStudent, [
    student.id,
    student.name,
    student.birthYear,
  ]);
};

const getStudentListings = (id) => {
  return querySchoolDB(qry.getListingsById, [id]);
};

const studentService = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
  getStudentAgeGroup: getStudentsByBirthYear,
  addNewStudent,
  getStudentListings,
};

module.exports = studentService;
