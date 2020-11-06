const { querySchoolDB } = require("../DB/SchoolDB");
const qry = require("../Queries/classQueries");
const ErrorHandle = require("../utils/ErrorHandler");
const labels = require("../utils/labels");
const employeeService = require("./employeeService");
const studentService = require("./studentService");
const subjectService = require("./subjectService");

const {
  newClassValid,
  addStudentValid,
  addStudentListValid,
  removeStudentValid,
} = require("./validation/classValidation");

const getAllClasses = () => querySchoolDB(qry.getAll);

const getActive = () => querySchoolDB(qry.getAllActive);

const getById = (id) => querySchoolDB(qry.getById, [id]);

const getBySubjectId = (subjectId) => querySchoolDB(qry.getClassBySubjectId);

const getStudentsInClass = (classId) =>
  querySchoolDB(qry.getStudentsInClass, [classId]);

const getStudentCount = async (classId) => {
  let students = await getStudentsInClass(classId);
  return students.length;
};

const addNewClass = async (classRec) => {
  let teacher = await employeeService.getEmployeeById(classRec.teacherId);
  let qualifications = [];
  if (teacher) {
    qualifications = await employeeService.getEmpQualifications(
      classRec.teacherId
    );
  }

  let subject = await subjectService.getSubjectById(classRec.subjectId);
  let valid = await newClassValid(
    classRec,
    teacher[0],
    subject[0],
    qualifications
  );
  if (!valid.isValid) {
    let failReason = new ErrorHandle(labels.cls.cannotAddClass);
    failReason.add(valid.reason);
    throw failReason;
  }

  let classData = [
    classRec.name,
    classRec.birthYear,
    classRec.schoolYear,
    classRec.teacherId,
    classRec.subjectId,
  ];

  return querySchoolDB(qry.addNewClass, classData);
};

const deactivateClass = async (id) => {
  let classRec = await getById(id);
  if (!classRec[0]) {
    let failReason = new ErrorHandle(labels.cls.cannotDeactivate);
    failReason.add(`${labels.cls.classDoesNotExistSingle}\n`);
    throw failReason;
  }

  return querySchoolDB(qry.deactivateById, [id]);
};

const activateClass = async (id) => {
  let classRec = await getById(id);
  if (!classRec[0]) {
    let failReason = new ErrorHandle(labels.cls.cannotActive);
    failReason.add(`${labels.cls.classDoesNotExistSingle}\n`);
    throw failReason;
  }

  return querySchoolDB(qry.activateById, [id]);
};

// Not used by users only for development
const deleteClass = async (id) => {
  let classRec = await getById(id);
  if (!classRec[0]) {
    let failReason = new ErrorHandle(labels.cls.cannotActive);
    failReason.add(`${labels.cls.classDoesNotExistSingle}\n`);
    throw failReason;
  }

  // Delete exams of this class,
  await querySchoolDB(qry.deleteListings, [id]);
  return querySchoolDB(qry.deleteById, [id]);
};

const addStudentToClass = async (classId, studentId) => {
  let student = await studentService.getStudentById(studentId);
  let classRec = await getById(classId);
  let valid = await addStudentValid(classRec[0], studentId, student[0]);
  if (!valid.isValid) {
    let failReason = new ErrorHandle(labels.cls.cannotAddSingle);
    failReason.add(valid.reason);
    throw failReason;
  }

  return querySchoolDB(qry.addStudentToClass, [classId, studentId]);
};

const addStudentListToClass = async (classId, studentIdList) => {
  let classRec = await getById(classId);
  let students = await studentService.getAllStudents();
  let valid = await addStudentListValid(classRec[0], studentIdList, students);
  if (!valid.isValid) {
    let failReason = new ErrorHandle(labels.cls.cannotAddList);
    failReason.add(valid.reason);
    throw failReason;
  }

  return querySchoolDB(qry.addStudentListToClass(studentIdList), [classId]);
};

const getListing = (classId, studentId) =>
  querySchoolDB(qry.getClassListing, [classId, studentId]);

const removeStudentFromClass = async (classId, studentId) => {
  let student = await studentService.getStudentById(studentId);
  let classRec = await getById(classId);
  let valid = await removeStudentValid(classRec[0], studentId, student[0]);
  if (!valid.isValid) {
    let failReason = new ErrorHandle(labels.cls.cannotRemoveSingle);
    failReason.add(valid.reason);
    throw failReason;
  }

  let listing = await getListing(classId, studentId);
  if (!listing.length) {
    let failReason = new ErrorHandle(labels.cls.cannotRemoveSingle);
    failReason.add(`${labels.cls.isNotListed}\n`);
    throw failReason;
  }
  return querySchoolDB(qry.removeStudentFromClass, [classId, studentId]);
};

const classService = {
  getAllClasses,
  getActiveClasses: getActive,
  getClassById: getById,
  getStudentsInClass,
  getStudentCount,
  addStudentToClass,
  removeStudentFromClass,
  addStudentListToClass,
  deactivateClass,
  activateClass,
  deleteClass,
  addNewClass,
  getBySubjectId,
  getListing,
};

module.exports = classService;
