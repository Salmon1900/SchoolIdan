export const classStudentsTable = {
  title: "תלמידים",
  columns: [
    { title: "שם תלמיד", field: "student_name" },
    { title: "מספר תז", field: "student_id" },
  ],
  dataIdProperty: "student_id",
  // addLabel: "הוספת מורה",
  // deleteLabel: "פיטור המורה",
};

export const addStudentForm = {
  title: "(הוספת תלמיד לכיתה(לפי שנתון התלמיד",
  buttonLabel: "הוספה",
  fields: [
    {
      // autocomplete
      type: "select",
      id: "studentId",
      name: "studentId",
      label: "בחר תלמיד",
      required: true,
      fullWidth: true,
      width: 12,
      dropdown: {
        name: "availableStudents",
        idAttr: "student_id",
        displayAttr: "student_name",
      },
    },
  ],
};

export const removeStudentForm = {
  title: "הסרת תלמיד מכיתה",
  buttonLabel: "הסרה",
  fields: [
    {
      type: "select",
      id: "studentId",
      name: "studentId",
      label: "בחר תלמיד",
      required: true,
      fullWidth: true,
      width: 12,
      dropdown: {
        name: "students",
        idAttr: "student_id",
        displayAttr: "student_name",
      },
    },
  ],
};

export const classItemActions = (functions, dropdowns, conditions) => {
  let addStudent = {
    name: "addStudent",
    label: "הוספת תלמיד",
    form: addStudentForm,
    actionFunc: functions.addStudent,
    dropdown: {
      availableStudents: dropdowns.availableStudents,
    },
  };

  let removeStudent = {
    name: "removeStudent",
    label: "הסרת תלמיד",
    form: removeStudentForm,
    actionFunc: functions.removeStudent,
    dropdown: {
      students: dropdowns.students,
    },
  };

  return {
    addStudent: conditions.addStudent ? addStudent : undefined,
    removeStudent: conditions.removeStudent ? removeStudent : undefined,
  };
};
