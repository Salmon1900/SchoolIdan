-- Run to reset DB with inital date
-- Truncates all tables and inserts inital data

TRUNCATE TABLE t_jobs RESTART IDENTITY CASCADE;
TRUNCATE TABLE t_students CASCADE;
TRUNCATE TABLE t_employees CASCADE;
TRUNCATE TABLE t_subjects RESTART IDENTITY CASCADE;


-- Jobs Table

INSERT INTO t_jobs(job_title) VALUES
	('מנהל'),
	('מורה'),
	('תחזוקה');
	
INSERT INTO t_subjects(subject_name) VALUES
	('מתמטיקה'),
	('אנגלית'),
	('לשון'),
	('ספורט'),
	('תנך'),
	('היסטוריה'),
	('פיסיקה'),
	('חינוך');
	
INSERT INTO t_employees(emp_id, emp_name, password, job_id, date_of_birth) VALUES
	-- Pass: "password"
	('111333001', 'עובד test1', '$2b$06$zCrlv8N7N5Cu6ZF61W.bPO3ourWXLxDd9ZQhfJ2sWscQIqjulZYpm', 2, '2000-06-09'),
	('111333002', 'עובד test2', '$2b$06$zCrlv8N7N5Cu6ZF61W.bPO3ourWXLxDd9ZQhfJ2sWscQIqjulZYpm', 2, '1995-03-05'),
	('111333003', 'עובד test3', '$2b$06$zCrlv8N7N5Cu6ZF61W.bPO3ourWXLxDd9ZQhfJ2sWscQIqjulZYpm', 2, '1999-01-01');


INSERT INTO t_students(student_id, student_name, birth_year) VALUES
	('111222001', 'בדיקה t1', '2000'),
	('111222002', 'בדיקה t2', '2004'),
	('111222003', 'בדיקה t3', '2004'),
	('111222004', 'בדיקה t4', '2004'),
	('111222005', 'בדיקה t5', '2004'),
	('111222006', 'בדיקה t6', '2000'),
	('111222007', 'בדיקה t7', '2000'),
	('111222008', 'בדיקה t8', '2000'),
	('111222009', 'בדיקה t9', '2000'),
	('111222010', 'בדיקה t10', '2002'),
	('111222011', 'בדיקה t11', '2002'),
	('111222012', 'בדיקה t12', '2002'),
	('111222013', 'בדיקה t13', '2002'),
	('111222014', 'בדיקה t14', '2002'),
	('111222015', 'בדיקה t15', '2002'),
	('111222016', 'בדיקה t16', '2002'),
	('111222017', 'בדיקה t17', '2002');


commit;