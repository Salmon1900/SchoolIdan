const { serverIP } = require("./apiConfig");
const { get, post, del } = require("./restFunctions");

export const getStudentList = () => {
    return get(`${serverIP}/students/all`);
}

export const getStudentById = (id) => {
    return get(`${serverIP}/students/${id}`);
}

export const deleteStudentById = (id) => {
    return del(`${serverIP}/students/delete/${id}`);
}

export const addNewStudent = (student) => {
    return post(`${serverIP}/students/new`, student);
}
