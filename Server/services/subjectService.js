const {querySchoolDB} = require('../DB/SchoolDB');
const qry = require('../Queries/subjectQueries')

const getAllSubjects = () => {
    return querySchoolDB(qry.getAllSubjects);
}

const getSubjectById = (id) => {
    return querySchoolDB(qry.getSubjectById, [id]);
}

const subjectService = {
    getAllSubjects: getAllSubjects,
    getSubjectById: getSubjectById
}


module.exports = subjectService;




