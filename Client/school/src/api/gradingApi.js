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

export const getTeacherStudentAvg = (teacherId, year) =>
  get(`${serverIP}/exams/teacher/avg/${teacherId}/${year}`);
export const getClassGrades = (classId) =>
  get(`${serverIP}/exams/teacher/class/${classId}`);
export const getTeacherSubjectGrades = (teacherId, subjectId, year) =>
  get(`${serverIP}/exams/teacher/subject/${teacherId}/${subjectId}/${year}`);
export const getTeacherAgeGroupGrades = (teacherId, ageGroup, year) =>
  get(`${serverIP}/exams/teacher/age/${teacherId}/${ageGroup}/${year}`);
