import { post } from "./restFunctions";
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
