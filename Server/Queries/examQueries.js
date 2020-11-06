const examQueries = {
  addExam: `INSERT INTO t_exams(student_id, class_id, grade, exam_date)
              VALUES($1, $2, $3, $4)`,
  getStudentAvg: `SELECT stud.student_id, stud.student_name, AVG(grade)
                  FROM t_exams as exm 
                  RIGHT JOIN t_students as stud
                      ON exm.student_id = stud.student_id
                  WHERE stud.student_id = $1
                  GROUP BY stud.student_id, stud.student_name`,
  getTeacherStudentAvgGrades: `SELECT stud.student_id, stud.student_name, AVG(grade) as grade
                               FROM t_exams as exm 
                               RIGHT JOIN t_students as stud
                                   ON exm.student_id = stud.student_id
                               WHERE stud.student_id IN (SELECT student_id 
                                                           FROM t_class_list 
                                                           WHERE class_id IN (SELECT class_id
                                                                           FROM t_classes
                                                                           WHERE teacher_id = $1))
                               GROUP BY stud.student_id, stud.student_name`,
  getTeacherSubjectGrades: `SELECT stud.student_id, stud.student_name, exm.grade, exm.exam_date
                            FROM t_exams as exm 
                            RIGHT JOIN t_students as stud
                                ON exm.student_id = stud.student_id
                            WHERE exm.class_id IN (SELECT class_id 
                                                   FROM t_classes
                                                   WHERE teacher_id = $1
                                                     AND subject_id = $2)`,
  getClassGrades: `SELECT stud.student_id, stud.student_name, exm.grade, exm.exam_date
                   FROM t_exams as exm 
                   RIGHT JOIN t_students as stud
                       ON exm.student_id = stud.student_id
                   WHERE exm.class_id = $1`,
  getTeacherAgeGroupGrades: `SELECT stud.student_id, stud.student_name, exm.grade, exm.exam_date
                             FROM t_exams as exm 
                             RIGHT JOIN t_students as stud
                                 ON exm.student_id = stud.student_id
                             WHERE exm.class_id IN (SELECT class_id 
                                                    FROM t_classes
                                                    WHERE teacher_id = $1
                                                      AND student_birth_year = $2)`,
};

module.exports = examQueries;
