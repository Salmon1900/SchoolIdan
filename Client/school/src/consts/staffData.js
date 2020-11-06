export const staffPanel = {
  title: "ניהול מורי בית הספר",
};

export const staffTable = {
  title: "רשימת מורים",
  columns: [
    { title: "שם מורה", field: "emp_name" },
    { title: "מספר תז", field: "emp_id" },
  ],
  dataIdProperty: "emp_id",
  addLabel: "הוספת מורה",
  deleteLabel: "פיטור המורה",
};

export const addTeacherForm = {
  title: "הוספת מורה",
  buttonLabel: "הוספה",
  // fullName, teacherId(9), dateOfBirth, image, password
  fields: [
    {
      id: "fullName",
      name: "fullName",
      label: "שם מלא",
      defaultValue: "",
      width: 12,
      rules: {
        required: "שדה חובה",
      },
      required: true,
      fullWidth: true,
    },
    {
      id: "teacherId",
      name: "teacherId",
      label: "מספר תז",
      defaultValue: "",
      width: 12,
      rules: {
        required: "שדה חובה",
        minLength: {
          value: 9,
          message: "יש להזין 9 תווים",
        },
        maxLength: {
          value: 9,
          message: "יש להזין 9 תווים",
        },
      },
      required: true,
      fullWidth: true,
    },
    {
      type: "date",
      id: "dateOfBirth",
      name: "dateOfBirth",
      label: "תאריך לידה",
      width: 6,
      rules: {
        required: "שדה חובה",
      },
      required: true,
      fullWidth: true,
    },
    {
      type: "file",
      id: "profilePic",
      name: "profilePic",
      label: "תמונת עובד",
      width: 6,
      required: true,
      fullWidth: true,
    },
    {
      id: "password",
      name: "password",
      label: "סיסמה",
      defaultValue: "",
      width: 12,
      rules: {
        required: "שדה חובה",
      },
      required: true,
      fullWidth: true,
    },
  ],
};

export const removeTeacherForm = {
  title: "פיטור מורה",
  buttonLabel: "מחיקה",
  actionAttribute: "teacherId",
  fields: [
    {
      id: "teacherId",
      name: "teacherId",
      label: "מספר תז של המורה",
      defaultValue: "",
      width: 12,
      rules: {
        required: "שדה חובה",
        minLength: {
          value: 9,
          message: "יש להזין 9 תווים",
        },
        maxLength: {
          value: 9,
          message: "יש להזין 9 תווים",
        },
      },
      required: true,
      fullWidth: true,
    },
  ],
};

export const addQualificationForm = {
  title: "הוספת הסמכה למורה",
  buttonLabel: "הוספה",
  fields: [
    {
      type: "select",
      id: "subjectId",
      name: "subjectId",
      label: "בחר מקצוע",
      required: true,
      fullWidth: true,
      width: 12,
      dropdown: {
        name: "availableSubjects",
        idAttr: "subject_id",
        displayAttr: "subject_name",
      },
    },
  ],
};

export const removeQualificationForm = {
  title: "שלילת הסמכה",
  buttonLabel: "שלילה",
  fields: [
    {
      type: "select",
      id: "subjectId",
      name: "subjectId",
      label: "בחר מקצוע",
      required: true,
      fullWidth: true,
      width: 12,
      dropdown: {
        name: "qualifications",
        idAttr: "subject_id",
        displayAttr: "subject_name",
      },
    },
  ],
};

export const assignClassForm = {
  title: "הוספת כיתה למורה",
  buttonLabel: "הוספה",
  fields: [
    {
      id: "className",
      name: "className",
      label: "שם הכיתה",
      required: true,
      fullWidth: true,
      width: 4,
      defaultValue: "",
      rules: {
        required: "שדה חובה",
      },
    },
    {
      type: "select",
      id: "subjectId",
      name: "subjectId",
      label: "מקצוע נלמד",
      required: true,
      fullWidth: true,
      width: 4,
      dropdown: {
        name: "qualifications",
        idAttr: "subject_id",
        displayAttr: "subject_name",
      },
    },
    {
      id: "birthYear",
      name: "birthYear",
      label: "שנת לידה של התלמידים בכיתה",
      required: true,
      fullWidth: true,
      width: 4,
      rules: {
        required: "שדה חובה",
        validate: (value) => !Number.isNaN(Number(value)) || "שנה לא תקינה",
      },
      defaultValue: "",
    },
  ],
};

export const deassignClassForm = {
  title: "השבתת כיתה של מורה",
  buttonLabel: "השבתה",
  fields: [
    {
      type: "select",
      id: "classId",
      name: "classId",
      label: "בחר כיתה",
      required: true,
      fullWidth: true,
      width: 12,
      dropdown: {
        name: "toughtClasses",
        idAttr: "class_id",
        displayAttr: "class_name",
      },
    },
  ],
};

export const staffActions = (functions, dropdowns) => {
  return {
    add: {
      name: "add",
      label: "הוסף מורה",
      form: addTeacherForm,
      actionFunc: functions.add,
    },
    remove: {
      name: "remove",
      label: "פיטור מורה",
      form: removeTeacherForm,
      actionFunc: functions.remove,
    },
  };
};

export const staffItemActions = (functions, dropdowns, conditions = {}) => {
  let addQualif = {
    name: "addQualif",
    label: "הוספת הסמכה",
    form: addQualificationForm,
    actionFunc: functions.addQualif,
    dropdown: {
      availableSubjects: dropdowns.availableSubjects,
    },
  };

  let removeQualif = {
    name: "removeQualif",
    label: "שלילת הסמכה",
    form: removeQualificationForm,
    actionFunc: functions.removeQualif,
    dropdown: {
      qualifications: dropdowns.qualifications,
    },
  };

  let assignClass = {
    name: "assignClass",
    label: "הוספת כיתה",
    form: assignClassForm,
    actionFunc: functions.assignClass,
    dropdown: {
      qualifications: dropdowns.qualifications,
    },
  };

  let deassignClass = {
    name: "deassignClass",
    label: "השבתת כיתה",
    form: deassignClassForm,
    actionFunc: functions.deassignClass,
    dropdown: {
      toughtClasses: dropdowns.toughtClasses,
    },
  };
  return {
    addQualif: addQualif,
    removeQualif: conditions.removeQualif ? removeQualif : undefined,
    assignClass: conditions.assignClass ? assignClass : undefined,
    deassignClass: conditions.deassignClass ? deassignClass : undefined,
  };
};
