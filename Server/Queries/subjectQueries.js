const subjectQueries = {
    getAllSubjects: "SELECT * FROM t_subjects",
    getSubjectById: "SELECT * FROM t_subjects WHERE subject_id = $1"
}

module.exports = subjectQueries;