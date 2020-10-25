const labels = require("../../utils/labels");

const newClassValid = async (
  classRec,
  teacher,
  subejct,
  teacherQualifications
) => {
  let reason = "";

  let qualified = await Boolean(
    teacherQualifications.find((q) => q.subject_id === classRec.subjectId)
  );

  if (!teacher) {
    reason = reason.concat(`${labels.cls.teacherDoesntExist}\n`);
  } else if (teacher.is_fired) {
    reason = reason.concat(`${labels.cls.teacherFired}\n`);
  } else if (!qualified) {
    reason = reason.concat(`${labels.cls.teacherNotQualified}\n`);
  }

  if (!subejct) {
    reason = reason.concat(`${labels.cls.subjectDoesntExist}\n`);
  }

  if (!classRec.name) {
    reason = reason.concat(`${labels.cls.wrongName}\n`);
  }

  if (
    Number(classRec.schoolYear) < 1900 ||
    Number(classRec.schoolYear > 2100) ||
    Number.isNaN(Number(classRec.schoolYear))
  ) {
    reason = reason.concat(`${labels.cls.wrongSchoolYear}\n`);
  }

  if (
    Number(classRec.birthYear) < 1900 ||
    Number(classRec.birthYear > 2100) ||
    Number.isNaN(Number(classRec.birthYear))
  ) {
    reason = reason.concat(`${labels.cls.wrongBirthYear}\n`);
  }

  return { isValid: !reason, reason: reason };
};

const addStudentValid = (classRec, studentId, student) => {
  let reason = "";

  if (!classRec) {
    reason = reason.concat(`${labels.cls.classDoesNotExistSingle}\n`);
  }

  if (studentId.length !== 9) {
    reason = reason.concat(`${labels.cls.idWrongLengthSingle}`);
  } else if (!student) {
    reason = reason.concat(`${labels.cls.studentDoesNotExistSingle}\n`);
  } else if (classRec && student.birth_year !== classRec.student_birth_year) {
    reason = reason.concat(`${labels.cls.wrongBirthYearSingle}`);
  }

  return { isValid: !reason, reason: reason };
};

const removeStudentValid = (classRec, studentId, student) => {
  let reason = "";

  if (!classRec) {
    reason = reason.concat(`${labels.cls.classDoesNotExistSingle}\n`);
  }

  if (studentId.length !== 9) {
    reason = reason.concat(`${labels.cls.idWrongLengthSingle}`);
  } else if (!student) {
    reason = reason.concat(`${labels.cls.studentDoesNotExistSingle}\n`);
  }

  return { isValid: !reason, reason: reason };
};

const addStudentListValid = async (classRec, studentIdList, allStudents) => {
  let reason = "";

  if (!classRec) {
    reason = reason.concat(`${labels.cls.classDoesNotExistList}\n`);
  }

  await studentIdList.forEach(async (studentId) => {
    let student = await allStudents.find(
      (student) => student.student_id === studentId
    );
    if (classRec && studentId.length !== 9) {
      reason = reason.concat(`${labels.cls.idWrongLengthList} - ${studentId}`);
    } else if (!student) {
      reason = reason.concat(
        `${labels.cls.studentDoesNotExistList} - ${studentId}`
      );
    } else if (classRec && student.birth_year !== classRec.student_birth_year) {
      reason = reason.concat(`${labels.cls.wrongBirthYearList} - ${studentId}`);
    }
  });

  return { isValid: !reason, reason: reason };
};

module.exports = {
  newClassValid,
  addStudentValid,
  addStudentListValid,
  removeStudentValid,
};
