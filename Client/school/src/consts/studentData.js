export const studentPanel = {
  title: "ניהול תלמידים",
};

export const studentTable = {
  title: "רשימת תלמידים",
  columns: [
    { title: "מספר תז", field: "student_id" },
    { title: "שם תלמיד", field: "student_name" },
    { title: "שנת לידה", field: "birth_year" },
  ],
  dataIdProperty: "student_id",
  addLabel: "הוספת תלמיד",
  removeLabel: "מחיקת תלמיד",
};

export const addStudentForm = {
  title: "הוספת תלמיד",
  buttonLabel: "הוספה",
  fields: [
    {
      id: "firstName",
      name: "firstName",
      label: "שם פרטי",
      defaultValue: "",
      width: 6,
      rules: {
        required: "שדה חובה",
      },
      required: true,
      fullWidth: true,
    },
    {
      id: "lastName",
      name: "lastName",
      label: "שם משפחה",
      defaultValue: "",
      width: 6,
      rules: {
        required: "שדה חובה",
      },
      required: true,
      fullWidth: true,
    },
    {
      id: "idNumber",
      name: "idNumber",
      label: "מספר תז",
      defaultValue: "",
      width: 6,
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
      id: "birthYear",
      name: "birthYear",
      label: "שנת לידה",
      defaultValue: "",
      width: 6,
      rules: {
        required: "שדה חובה",
        validate: (value) => !Number.isNaN(Number(value)) || "שנה לא תקינה",
      },
      required: true,
      fullWidth: true,
    },
  ],
};

export const removeStudentForm = {
  title: "מחיקת תלמיד",
  buttonLabel: "מחיקה",
  actionAttribute: "idNumber",
  fields: [
    {
      id: "idNumber",
      name: "idNumber",
      label: "מספר תז של התלמיד",
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

export const studentActions = (functions, dropdowns) => {
  return {
    add: {
      name: "add",
      label: "הוסף תלמיד",
      form: addStudentForm,
      actionFunc: functions.add,
    },
    remove: {
      name: "remove",
      label: "מחק תלמיד",
      form: removeStudentForm,
      actionFunc: functions.remove,
    },
  };
};
