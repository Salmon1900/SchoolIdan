const employeeQueries = {
    getAllEmployees: "SELECT * FROM t_employees",
    getEmployeeById: "SELECT * FROM t_employees WHERE emp_id = $1",
    addNewEmployee: `INSERT INTO t_employees(emp_id, emp_name, password, job_id, date_of_birth, picture)
                                      VALUES($1, $2, $3, $4, $5, $6)`,
    getEmpQualifications: `SELECT * FROM t_subjects
                           WHERE subject_id IN(SELECT subject_id 
                                               FROM t_qualified
                                               WHERE emp_id = $1)`,
    getEmpQualifiedForSubject: `SELECT * FROM t_employees
                                WHERE emp_id IN(SELECT emp_id 
                                                FROM t_qualified
                                                WHERE subject_id = $1)`
}

module.exports = employeeQueries;