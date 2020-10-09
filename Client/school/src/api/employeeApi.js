import { serverIP } from './apiConfig';
import { post, get } from './restFunctions';
import * as FormDataLib from 'form-data'

export const addNewEmployee = async (employee) => {
    let dob = employee.dateOfBirth;
    let newEmployee = {
        id: employee.id,
        name: `${employee.firstName} ${employee.lastName}`,
        job: employee.jobId,
        // dateOfBirth: employee.dateOfBirth.toJSON().slice(0, 10),
        dateOfBirth: `${dob.slice(6, 10)}-${dob.slice(0, 2)}-${dob.slice(3, 5)}`,
        password: employee.password,
        picture: employee.picture
    }
    let newEmployee2 = new FormData()
    await newEmployee2.append('id', employee.id);
    await newEmployee2.append('name', `${employee.firstName} ${employee.lastName}`);
    await newEmployee2.append('job', employee.jobId);
    await newEmployee2.append('dateOfBirth', `${dob.slice(6, 10)}-${dob.slice(0, 2)}-${dob.slice(3, 5)}`);
    await newEmployee2.append('password', employee.password);
    await newEmployee2.append('profile', employee.picture);
    // console.log(newEmployee2.getBoundary())


    // return post(`${serverIP}/employees/new`, newEmployee, 'application/json')
    return post(`${serverIP}/employees/new2`, newEmployee2, 'multipart/form-data; boundary=aaaaaaaa')
}

export const getAllEmployees = () => {
    return get(`${serverIP}/employees`);
}

export const getEmployeeQualifications = (id) => {
    return get(`${serverIP}/employees/qualif/${id}`)
}
