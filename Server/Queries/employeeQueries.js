const employeeQueries = {
  getAllEmployees:
    "SELECT emp_id, emp_name, password, job_id, date_of_birth, ENCODE(picture, 'base64') FROM t_employees",
  // "SELECT emp_id, emp_name, password, job_id, date_of_birth, picture FROM t_employees",
  getEmployeeById:
    "SELECT emp_id, emp_name, password, job_id, date_of_birth, ENCODE(picture, 'base64') FROM t_employees WHERE emp_id = $1",
  addNewEmployee: `INSERT INTO t_employees(emp_id, emp_name, password, job_id, date_of_birth, picture)
                                      VALUES($1, $2, $3, $4, $5, $6)`,
  getEmpQualifications: `SELECT * FROM t_subjects
                           WHERE subject_id IN(SELECT subject_id 
                                               FROM t_qualified
                                               WHERE emp_id = $1)
                                            AND isactive = true`,
  getEmpQualifiedForSubject: `SELECT * FROM t_employees
                                WHERE emp_id IN(SELECT emp_id 
                                                FROM t_qualified
                                                WHERE subject_id = $1)`,
  getEmployeeClasses: `SELECT * FROM t_classes WHERE teacher_id = $1`,
  getEmployeeClassesForYear: `SELECT * FROM t_classes WHERE teacher_id = $1 AND school_year = $2`,
  getHired: `SELECT emp_id, emp_name, password, job_id, date_of_birth, ENCODE(picture, 'base64') FROM t_employees WHERE job_id = 2 AND is_fired = false`,
  fireById: `UPDATE t_employees SET is_fired = true WHERE emp_id = $1`,
  getNotQualified: `SELECT * FROM t_subjects
                    WHERE subject_id NOT IN(SELECT subject_id 
                                        FROM t_qualified
                                        WHERE emp_id = $1)
                                     AND isactive = true`,
  addQualification: `INSERT INTO t_qualified(emp_id, subject_id) VALUES($1, $2)`,
  removeQualification: `DELETE FROM t_qualified WHERE emp_id = $1 AND subject_id = $2`,
  getQualification: `SELECT * FROM t_qualified WHERE emp_id = $1 AND subject_id = $2`,
  getAgeGroups:
    "SELECT DISTINCT student_birth_year FROM t_classes WHERE teacher_id = $1",
};

module.exports = employeeQueries;
