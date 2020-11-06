const { querySchoolDB } = require("../DB/SchoolDB");
const qry = require("../Queries/employeeQueries");
const encryptor = require("bcrypt");
const ErrorHandle = require("../utils/ErrorHandler");
const labels = require("../utils/labels");
const { newEmpValid } = require("./validation/employeeValidation");
const subjectService = require("./subjectService");

const getAllEmployees = () => {
  return querySchoolDB(qry.getAllEmployees);
};

const getEmployeeById = (id) => {
  return querySchoolDB(qry.getEmployeeById, [id]);
};

const getHiredTeachers = () => querySchoolDB(qry.getHired);

const fireTeacherById = async (id) => {
  let teacher = await getEmployeeById(id);
  console.log(teacher);
  if (!teacher.length) {
    let failReason = new ErrorHandle(labels.emp.cannotFire);
    failReason.add(`${labels.emp.doesNotExist}\n`);
    throw failReason;
  }

  return querySchoolDB(qry.fireById, [id]);
};

const getNotQualifiedFor = (id) => querySchoolDB(qry.getNotQualified, [id]);

const getQualfication = (empId, subjectId) =>
  querySchoolDB(qry.getQualification, [empId, subjectId]);

const removeQualification = async (empId, subjectId) => {
  // Check : emp exists, subject exist, is unique,
  let employeeWithId = await getEmployeeById(empId);
  if (!employeeWithId.length) {
    let failReason = new ErrorHandle(labels.emp.cannotDeleteQualif);
    failReason.add(`${labels.emp.doesNotExist}\n`);
    throw failReason;
  }

  let subjectWithId = await subjectService.getSubjectById(subjectId);
  if (!subjectWithId.length) {
    let failReason = new ErrorHandle(labels.emp.cannotDeleteQualif);
    failReason.add(`${labels.sub.doesNotExist}\n`);
    throw failReason;
  }

  let qualification = await getQualfication(empId, subjectId);
  if (!qualification.length) {
    let failReason = new ErrorHandle(labels.emp.cannotDeleteQualif);
    failReason.add(`${labels.emp.qualifDoesNotExist}\n`);
    throw failReason;
  }

  return querySchoolDB(qry.removeQualification, [empId, subjectId]);
};

const addQualification = async (empId, subjectId) => {
  // Check : emp exists, subject exist, is unique,
  let employeeWithId = await getEmployeeById(empId);
  if (!employeeWithId.length) {
    let failReason = new ErrorHandle(labels.emp.cannotAddQualif);
    failReason.add(`${labels.emp.doesNotExist}\n`);
    throw failReason;
  }

  let subjectWithId = await subjectService.getSubjectById(subjectId);
  if (!subjectWithId.length) {
    let failReason = new ErrorHandle(labels.emp.cannotAddQualif);
    failReason.add(`${labels.sub.doesNotExist}\n`);
    throw failReason;
  }

  let qualification = await getQualfication(empId, subjectId);
  if (qualification.length) {
    let failReason = new ErrorHandle(labels.emp.cannotAddQualif);
    failReason.add(`${labels.emp.qualifExists}\n`);
    throw failReason;
  }

  return querySchoolDB(qry.addQualification, [empId, subjectId]);
};

const createNewEmployee = async (newEmployee, profilePic = null) => {
  // Check if request data passes rules
  let empValidation = newEmpValid(newEmployee);

  // If not send what rules did not pass
  if (!empValidation.isValid) {
    let failReason = new ErrorHandle(labels.emp.cannotAdd);
    failReason.add(empValidation.reason);
    throw failReason;
  }

  // Check if request correlates with db data
  let employee = await getEmployeeById(newEmployee.id);
  if (employee.length) {
    let failReason = new ErrorHandle(labels.emp.cannotAdd);
    failReason.add(labels.emp.idTaken);
    throw failReason;
  }

  let hashedPass = await encryptor.hashSync(newEmployee.password, 6);

  let employeeDetails = [
    newEmployee.id,
    newEmployee.name,
    hashedPass,
    newEmployee.job,
    newEmployee.dateOfBirth,
    profilePic,
  ];
  return querySchoolDB(qry.addNewEmployee, employeeDetails);
};

const getEmployeeClasses = (id) => querySchoolDB(qry.getEmployeeClasses, [id]);

const getEmployeeClassesForYear = (id, year) => querySchoolDB(qry.getEmployeeClassesForYear, [id, year]);


const getEmployeeToughtAgeGroups = async (id) => {
  return querySchoolDB(qry.getAgeGroups, [id]);
};

const getEmployeeQualifiationsById = (id) => {
  return querySchoolDB(qry.getEmpQualifications, [id]);
};

const getEmployeesQualifiedForSubejct = (subjectId) => {
  return querySchoolDB(qry.getEmpQualifiedForSubject, [subjectId]);
};

const employeeService = {
  getEmployeeList: getAllEmployees,
  getEmployeeById: getEmployeeById,
  createNewEmployee: createNewEmployee,
  getEmpQualifications: getEmployeeQualifiationsById,
  getQualifiedForSubject: getEmployeesQualifiedForSubejct,
  getEmployeeClasses,
  getEmployeeClassesForYear,
  getHiredTeachers,
  fireTeacherById,
  getNotQualifiedFor,
  addQualification,
  removeQualification,
  getEmployeeToughtAgeGroups,
};

module.exports = employeeService;
