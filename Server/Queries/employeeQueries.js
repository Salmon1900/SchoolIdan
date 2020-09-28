const employeeQueries = {
    getAllEmployees: "SELECT * FROM t_employees",
    getEmployeeById: "SELECT * FROM t_employees WHERE emp_id = $1",
    addNewEmployee: `INSERT INTO t_employees(emp_id, emp_name, password, job_id, date_of_birth)
                                      VALUES($1, $2, $3, $4, $5)`,
    getEmpQualifications: `SELECT * FROM t_subjects
                           WHERE subject_id IN(SELECT subject_id 
                           FROM t_qualified
                           WHERE emp_id = $1)`
}

module.exports = employeeQueries;