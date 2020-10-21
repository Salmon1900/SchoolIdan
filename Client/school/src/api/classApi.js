import { get, post, put, del } from "./restFunctions";
import { serverIP } from "./apiConfig";

export const getClassStudentCount = (id) =>
  get(`${serverIP}/classes/get/studentsCount/${id}`);

export const createNewClass = (classObj) =>
  post(`${serverIP}/classes/new`, classObj);

export const deactivateClass = (classId) =>
  put(`${serverIP}/classes/deactivate/${classId}`);

export const getClass = (classId) => get(`${serverIP}/classes/get/${classId}`);

export const getClassStudents = (classId) =>
  get(`${serverIP}/classes/get/students/${classId}`);

export const addStudentToClass = (classId, studentId) =>
  post(`${serverIP}/classes/students/add/single`, { classId, studentId });

export const removeStudentFromClass = (classId, studentId) =>
  del(`${serverIP}/classes/students/remove/single`, { classId, studentId });
