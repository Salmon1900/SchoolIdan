const labels = {
  // Employees
  emp: {
    cannotAdd: "שגיאה בהוספת עובד",
    idTaken: "קיים עובד במערכת עם מספר התז שהוזן",
    passwordTooShort: "הסיסמה שהוזנה קצרה מדי",
    idNotEntered: "לא הוזן מספר תז",
    passwordNotEntered: "לא הוזנה סיסמה",
    nameNotEntered: "לא הוזן שם",
    jobNotEntered: "לא הוזן תפקיד העובד",
    idWrongLength: "אורך מספר התז שהוזן שגוי",
    cannotFire: "שגיאה בפיטור העובד",
    doesNotExist: "העובד עם מספר התז שהוזן לא קיים במערכת",
    cannotAddQualif: "שגיאה בהוספת הסמכה לעובד",
    qualifExists: "העובד כבר מוסמך למקצוע זה",
    cannotDeleteQualif: "שגיאה בשלילת הסמכה מעובד",
    qualifDoesNotExist: "ההסמכה שברצונך לשלול לא קיימת",
  },

  // Students
  stud: {
    cannotAdd: "שגיאה בהוספת תלמיד",
    idTaken: "קיים תלמיד במערכת עם מספר התז שהוזן",
    idNotEntered: "לא הוזן מספר תז של התלמיד",
    nameNotEntered: "לא הוזן שם",
    birthYearNotEntered: "לא הוזנה שנת לידה",
    invalidBirthYear: "שנת הלידה שהוזנה לא חוקית",
    idWrongLength: "אורך מספר התז שהוזן שגוי",
    cannotDelete: "שגיאה במחיקת תלמיד",
    doesNotExist: "תלמיד עם תז זה לא קיים במערכת",
  },

  // Subjects
  sub: {
    cannotDeactivate: "שגיאה בהשבתת מקצוע",
    doesNotExist: "מקצוע זה לא קיים במערכת",
  },

  // Classes
  cls: {
    // Add single student listing
    cannotAddSingle: "שגיאה בהוספת תלמיד לכיתה",
    idWrongLengthSingle: "אורך מספר התז שהוזן שגוי",
    studentDoesNotExistSingle: "התלמיד שהוזן לא קיים במערכת",
    classDoesNotExistSingle: "הכיתה שנבחרה לא קיימת",
    wrongBirthYearSingle: "התלמיד בעל שנת לידה לא מתאימה",
    // Add list of students
    cannotAddList: "שגיאה בהוספת תלמידים לכיתה",
    idWrongLengthList: "אורך מספר התז שהוזן שגוי",
    studentDoesNotExistList: "התלמיד אינו קיים במערכת",
    classDoesNotExistList: "הכיתה שנבחרה לא קיימת",
    wrongBirthYearList: "התלמיד בעל שנת לידה לא מתאימה",
    // Remove single student listing
    cannotRemoveSingle: "שגיאה בהסרת תלמיד לכיתה",
    isNotListed: "התלמיד שברצונך להסיר לא שייך לכיתה",
    // Activate and deactivate
    cannotDeactivate: "שגיאה בהשבתת כיתה",
    cannotActive: "שגיאה בהפעלת כיתה",
    // New Class
    cannotAddClass: "שגיאה ביצירת כיתה",
    teacherDoesntExist: "המורה הנבחר לכיתה לא קיים במערכת",
    teacherFired: "המורה הנבחר לכיתה אינו עובד פעיל",
    subjectDoesntExist: "המקצוע הנבחר אינו קיים או אינו פעיל",
    wrongBirthYear: "שנת הלידה שהוזנה שגויה",
    wrongSchoolYear: "שנת הלימודים שהוזנה שגויה",
    teacherNotQualified: "למורה הנבחר אין הסמכה ללמד את המקצוע הנבחר",
    wrongName: "השם שהוזן אינו חוקי",
  },

  // Exams
  exm: {
    cannontAdd: "שגיאה בהזנת ציון",
    studentNotInClass: "התלמיד אינו משויך לכיתה שנבחרה",
    invalidGrade: "הציון שהוזן אינו תקין",
    gradeNotInRange: "על הציון להיות בין 0-100",
  },
};

module.exports = labels;
