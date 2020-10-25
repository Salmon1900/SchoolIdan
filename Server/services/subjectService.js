const { querySchoolDB } = require("../DB/SchoolDB");
const qry = require("../Queries/subjectQueries");
const labels = require("../utils/labels");
const classService = require("../services/classService");

const getAllSubjects = () => {
  return querySchoolDB(qry.getAllSubjects);
};

const getSubjectById = (id) => {
  return querySchoolDB(qry.getSubjectById, [id]);
};

const getSubjectByName = (name) => {
  return querySchoolDB(qry.getSubjectByName, [name]);
};

const getActive = () => {
  return querySchoolDB(qry.getActive);
};

const deactivateById = async (id) => {
  let subjectsWithId = await getSubjectById(id);
  if (!subjectsWithId.length) {
    let failReason = new ErrorHandle(labels.sub.cannotDeactivate);
    failReason.add(labels.sub.doesNotExist);
    throw failReason;
  }

  let classesWithSubject = await classService.getBySubjectId(id);
  classesWithSubject.forEach((classObj) => deactivateById(classObj.class_id));
  return querySchoolDB(qry.deactivateById, [id]);
};

const activateById = (id) => {
  return querySchoolDB(qry.activateById, [id]);
};

const addNewSubejct = async (name) => {
  // If subject name exists just acivate it, else create new entry
  let subjectsWithName = await getSubjectByName(name);
  if (subjectsWithName.length) {
    return activateById(subjectsWithName[0].subject_id);
  } else {
    return querySchoolDB(qry.addNewSubject, [name]);
  }
};

const subjectService = {
  getAllSubjects: getAllSubjects,
  getSubjectById: getSubjectById,
  getActive: getActive,
  deactivateById: deactivateById,
  addNewSubejct: addNewSubejct,
};

module.exports = subjectService;
