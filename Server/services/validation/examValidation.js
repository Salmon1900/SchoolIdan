const labels = require("../../utils/labels");

const newExamValid = (student, classObj, listing, grade) => {
  let reason = "";

  if (!student) {
    reason = reason.concat(`${labels.stud.doesNotExist}`);
  }

  if (!classObj) {
    reason = reason.concat(`${labels.cls.classDoesNotExistSingle}`);
  }

  if (student && classObj && !listing) {
    reason = reason.concat(`${labels.exm.studentNotInClass}`);
  }

  if (Number.isNaN(Number(grade))) {
    reason = reason.concat(`${labels.exm.invalidGrade}`);
  } else if (Number(grade) > 100 || Number(grade) < 0) {
    reason = reason.concat(`${labels.exm.gradeNotInRange}`);
  }

  return { isValid: !reason, reason: reason };
};

module.exports = {
  newExamValid,
};
