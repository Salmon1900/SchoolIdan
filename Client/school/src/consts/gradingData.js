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
