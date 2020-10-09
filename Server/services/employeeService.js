const { querySchoolDB } = require('../DB/SchoolDB');
const qry = require('../Queries/employeeQueries');
const encryptor = require('bcrypt');
const ErrorHandle = require('../utils/ErrorHandler');
const labels = require('../utils/labels')
const { newEmpValid } = require('./validation/employeeValidation')

const getAllEmployees = () => {
    return querySchoolDB(qry.getAllEmployees);
}

const getEmployeeById = (id) => {
    return querySchoolDB(qry.getEmployeeById, [id]);
}

const createNewEmployee = async (newEmployee, profilePic) => {
    // Check if request data passes rules
    let empValidation = newEmpValid(newEmployee);

    // If not send what rules did not pass
    if(!empValidation.isValid){
        let failReason = new ErrorHandle(labels.emp.cannotAdd);
        failReason.add(empValidation.reason);
        throw failReason;
    }

    // Check if request correlates with db data
    let employee = await getEmployeeById(newEmployee.id);
    if(employee.length){
        let failReason = new ErrorHandle(labels.emp.cannotAdd);
        failReason.add(labels.emp.idTaken);
        throw failReason
    }

    let hashedPass = await encryptor.hashSync(newEmployee.password, 6)

    let employeeDetails = [newEmployee.id, newEmployee.name, hashedPass, newEmployee.job, newEmployee.dateOfBirth, profilePic]
    return querySchoolDB(qry.addNewEmployee, employeeDetails);
}


const getEmployeeQualifiationsById = (id) => {
    return querySchoolDB(qry.getEmpQualifications, [id]);
}

const getEmployeesQualifiedForSubejct = (subjectId) => {
    return querySchoolDB(qry.getEmpQualifiedForSubject, [subjectId]);
}

const employeeService = {
    getEmployeeList: getAllEmployees,
    getEmployeeById: getEmployeeById,
    createNewEmployee: createNewEmployee,
    getEmpQualifications: getEmployeeQualifiationsById,
    getQualifiedForSubject: getEmployeesQualifiedForSubejct
}

module.exports = employeeService;