const studentQueries = {
    getAll: 'SELECT * FROM t_students',
    getById: 'SELECT * FROM t_students WHERE student_id = $1',
    deleteById: `DELETE FROM t_students WHERE student_id = $1`,
    deleteListingsById: `DELETE FROM t_class_list WHERE student_id = $1`,
    getListingsById: `SELECT * FROM t_class_list WHERE student_id = $1`,
    addStudent: 'INSERT INTO t_students(student_id, student_name, birth_year) VALUES ($1, $2, $3)'
}

module.exports = studentQueries;