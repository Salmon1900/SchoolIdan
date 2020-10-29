export const gradeStudentForm = {
  title: "הזנת ציון",
  buttonLabel: "שמירה",
  fields: [
    {
      id: "grade",
      name: "grade",
      label: "הזן ציון",
      required: true,
      fullWidth: true,
      width: 6,
      rules: {
        required: "שדה חובה",
        validate: {
          isANumber: (value) => !Number.isNaN(Number(value)) || "ציון לא תקין",
          //   validGrade: (value) =>
          //     (Number.isNaN(Number(value)) &&
          //       Number(value) >= 0 &&
          //       Number(value) <= 100) ||
          //     "על הציון להיות בין 0-100",
        },
      },
    },
    {
      type: "date",
      id: "examDate",
      name: "examDate",
      label: "תאריך המבחן",
      width: 6,
      rules: {
        required: "שדה חובה",
      },
      required: true,
      fullWidth: true,
    },
  ],
};

// If want to add dropdowns/conditional action see - classData - classItemActions
export const gradingActions = (functions) => {
  return {
    gradeStudent: {
      name: "gradeStudent",
      label: "הזנת ציון",
      form: gradeStudentForm,
      actionFunc: functions.gradeStudent,
    },
  };
};

export const gradeTableData = {
  columns: [
    { title: "שם תלמיד", field: "student_name" },
    { title: "ציון", field: "grade" },
  ],
  avgColumns: [
    { title: "שם תלמיד", field: "student_name" },
    { title: "ציון ממוצע", field: "avg" },
  ],
};

export const gradeStatSections = {
  allAvg: "ממוצע ציוני התלמידים",
  bySubject: {
    title: "חלוקה לפי מקצוע",
    idProperty: "subject_id",
    nameProperty: "subject_name",
  },
  byClass: {
    title: "חלוקה לפי כיתות",
    idProperty: "class_id",
    nameProperty: "class_name",
  },
  byAge: {
    title: "חלוקה לפני שנתון",
    idProperty: "student_birth_year",
    nameProperty: "student_birth_year",
  },
};

export const ranges = {
  fail: 54,
  low: 70,
  medium: 84,
  high: 100,
};
