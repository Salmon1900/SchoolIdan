export const subjectPanel = {
  title: "רשימת מקצועות",
};

export const subjectTable = {
  title: "רשימת מקצועות",
  columns: [
    { title: "מס מקצוע", field: "subject_id" },
    { title: "שם מקצוע", field: "subject_name" },
  ],
  dataIdProperty: "subject_id",
  addLabel: "הוספת מקצוע",
  removeLabel: "מחיקת מקצוע",
};

export const addSubjectForm = {
  title: "הוספת מקצוע",
  buttonLabel: "הוספה",
  fields: [
    {
      id: "subjectName",
      name: "subjectName",
      label: "מקצוע",
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

export const removeSubjectForm = {
  title: "הסרת מקצוע",
  buttonLabel: "הסרה",
  fields: [
    {
      type: "select",
      id: "subjectId",
      name: "subjectId",
      label: "מקצוע",
      required: true,
      fullWidth: true,
      width: 12,
      dropdown: {
        name: "subjects",
        idAttr: "subject_id",
        displayAttr: "subject_name",
      },
    },
  ],
};

export const subjectActions = (functions, dropdowns) => {
  return {
    add: {
      name: "add",
      label: "הוסף מקצוע",
      form: addSubjectForm,
      actionFunc: functions.add,
    },
    remove: {
      name: "remove",
      label: "מחק מקצוע",
      form: removeSubjectForm,
      actionFunc: functions.remove,
      dropdown: {
        subjects: dropdowns.subjects,
      },
    },
  };
};
