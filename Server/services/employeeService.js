const { querySchoolDB } = require('../DB/SchoolDB');
const qry = require('../Queries/employeeQueries');
const encryptor = require('bcrypt');
const ErrorHandle = require('../utils/ErrorHandler');
const labels = require('../utils/labels')

const getAllEmployees = () => {
    return querySchoolDB(qry.getAllEmployees);
}

const getEmployeeById = (id) => {
    return querySchoolDB(qry.getEmployeeById, [id]);
}

const createNewEmployee = async (newEmployee) => {
    let empValidation = newEmpValid(newEmployee);

    if(!empValidation.isValid){
        let failReason = new ErrorHandle(labels.emp.cannotAdd);
        failReason.add(empValidation.reason);
        throw failReason;
    }

    let employee = await getEmployeeById(newEmployee.id);
    if(employee.length){
        let failReason = new ErrorHandle(labels.emp.cannotAdd);
        failReason.add(labels.emp.idTaken);
        throw failReason
    }

    let hashedPass = await encryptor.hashSync(newEmployee.password, 6)

    let employeeDetails = [newEmployee.id, newEmployee.name, hashedPass, newEmployee.job, newEmployee.dateOfBirth]
    return querySchoolDB(qry.addNewEmployee, employeeDetails);
}

const newEmpValid = (emp) => {
    let reason = "";
    if(!emp.id){
        reason = reason.concat(`${labels.emp.idNotEntered}\n`);
    } else if(emp.id.length !== 9){
        reason = reason.concat(`${labels.emp.idWrongLength}\n`);
    }

    if(!emp.password){
        reason = reason.concat(`${labels.emp.passwordNotEntered}\n`);
    }

    if(!emp.job){
        reason = reason.concat(`${labels.emp.jobNotEntered}\n`);
    }

    if(!emp.name){
        reason = reason.concat(`${labels.emp.nameNotEntered}\n`);
    }

    if(emp.password.length < 6){
        reason = reason.concat(`${labels.emp.passwordTooShort}\n`);
    }

    return { isValid: !reason, reason: reason};
}

const getEmployeeQualifiationsById = (id) => {
    return querySchoolDB(qry.getEmpQualifications, [id]);
}

const employeeService = {
    getEmployeeList: getAllEmployees,
    getEmployeeById: getEmployeeById,
    createNewEmployee: createNewEmployee,
    getEmpQualifications: getEmployeeQualifiationsById
}

module.exports = employeeService;