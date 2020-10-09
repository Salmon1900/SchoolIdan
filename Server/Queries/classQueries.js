const classQueries = {
    getAll: `SELECT * FROM t_classes`,
    getById: `SELECT * FROM t_classes WHERE class_id = $1`,
    addNewClass: `INSERT INTO t_classes(class_name, student_birth_year, school_year, teacher_id, subject_id)
                                VALUES($1, $2, $3, $4, $5)`,
    getAllActive: `SELECT * FROM t_classes WHERE isactive = true`,
    deactivateById: `UPDATE t_classes SET isactive = false WHERE class_id = $1`,
    activateById: `UPDATE t_classes SET isactive = true WHERE class_id = $1`,
    deleteById: `DELETE FROM t_classes WHERE class_id = $1`,
    deleteListings: `DELETE FROM t_class_list WHERE class_id = $1`,
    getStudentsInClass: `SELECT * FROM t_students 
                                  WHERE student_id IN(SELECT student_id FROM t_class_list WHERE class_id = $1)`,
    addStudentToClass: `INSERT INTO t_class_list(class_id, student_id) VALUES ($1, $2)`,
    addStudentListToClass: (studentIdList) => `INSERT INTO t_class_list(class_id, student_id) 
                                               VALUES ${studentIdList.map(studentId => `($1, ${studentId}),`).join("")}`.slice(0, -1),
        
    
}

module.exports = classQueries;