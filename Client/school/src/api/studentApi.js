const { serverIP } = require("./apiConfig");
const { get, post, del } = require("./restFunctions");

export const getStudentList = () => {
  return get(`${serverIP}/students/get/all`);
};

export const getStudentById = (id) => {
  return get(`${serverIP}/students/get/${id}`);
};

export const deleteStudentById = (id) => {
  return del(`${serverIP}/students/delete/${id}`);
};

export const addNewStudent = (student) => {
  return post(`${serverIP}/students/new`, student);
};

export const getStudentAgeGroup = (birthYear) =>
  get(`${serverIP}/students/get/age-group/${birthYear}`);
