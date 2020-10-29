import { post, get } from "./restFunctions";
import { serverIP } from "./apiConfig";

export const addGradeToStudent = (studentId, classId, grade, examDate) => {
  let exam = {
    studentId,
    classId,
    grade: Number(grade),
    examDate: `${examDate.slice(6, 10)}-${examDate.slice(
      0,
      2
    )}-${examDate.slice(3, 5)}`,
  };
  return post(`${serverIP}/exams/add`, exam);
};

export const getTeacherStudentAvg = (teacherId) =>
  get(`${serverIP}/exams/teacher/avg/${teacherId}`);
export const getClassGrades = (classId) =>
  get(`${serverIP}/exams/teacher/class/${classId}`);
export const getTeacherSubjectGrades = (teacherId, subjectId) =>
  get(`${serverIP}/exams/teacher/subject/${teacherId}/${subjectId}`);
export const getTeacherAgeGroupGrades = (teacherId, ageGroup) =>
  get(`${serverIP}/exams/teacher/age/${teacherId}/${ageGroup}`);
