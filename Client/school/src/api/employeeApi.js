import { serverIP } from './apiConfig';
import { post, get } from './restFunctions';

export const addNewEmployee = (employee) => {
    let dob = employee.dateOfBirth;
    let newEmployee = {
        id: employee.id,
        name: `${employee.firstName} ${employee.lastName}`,
        job: employee.jobId,
        // dateOfBirth: employee.dateOfBirth.toJSON().slice(0, 10),
        dateOfBirth: `${dob.slice(6, 10)}-${dob.slice(0, 2)}-${dob.slice(3, 5)}`,
        password: employee.password
    }
    return post(`${serverIP}/employees/new`, newEmployee)
}

export const getAllEmployees = () => {
    return get(`${serverIP}/employees`);
}

export const getEmployeeQualifications = (id) => {
    return get(`${serverIP}/employees/qualif/${id}`)
}
