import { serverIP } from "./apiConfig";
import { post, get, put, del } from "./restFunctions";

export const addNewEmployee = async (employee) => {
  let dob = employee.dateOfBirth;
  let newEmployee = new FormData();
  await newEmployee.append("id", employee.id);
  await newEmployee.append(
    "name",
    `${employee.firstName} ${employee.lastName}`
  );
  await newEmployee.append("job", employee.jobId);
  await newEmployee.append(
    "dateOfBirth",
    `${dob.slice(6, 10)}-${dob.slice(0, 2)}-${dob.slice(3, 5)}`
  );
  await newEmployee.append("password", employee.password);
  await newEmployee.append("profile", employee.picture);

  return post(
    `${serverIP}/employees/new`,
    newEmployee,
    "multipart/form-data; boundary=aaaaaaaa"
  );
};

export const getAllEmployees = () => {
  return get(`${serverIP}/employees`);
};

export const getHiredTeachers = () =>
  get(`${serverIP}/employees/teachers/hired`);

export const getEmployeeQualifications = (id) => {
  return get(`${serverIP}/employees/qualif/${id}`);
};

export const getSubjectsEmpNotQualifiedFor = (id) => {
  return get(`${serverIP}/employees/qualif/not/${id}`);
};

export const addQualificationToEmp = (empId, subjectId) => {
  return post(`${serverIP}/employees/qualif/add`, {
    id: empId,
    subjectId: subjectId,
  });
};

export const removeEmpQualification = (empId, subjectId) => {
  return del(`${serverIP}/employees/qualif/remove`, {
    id: empId,
    subjectId: subjectId,
  });
};

export const getEmployeeClasses = (id) => {
  return get(`${serverIP}/employees/classes/${id}`);
};

export const getEmployeeClassesForYear = (id, year) => {
  return get(`${serverIP}/employees/classesInYear/${id}/${year}`);
};

export const fireTeacherById = (id) => {
  return put(`${serverIP}/employees/fire/${id}`);
};

export const getEmployeeById = (id) => {
  return get(`${serverIP}/employees/get/${id}`);
};

export const getTeacherAgeGroups = (id) =>
  get(`${serverIP}/employees/ageGroups/${id}`);
