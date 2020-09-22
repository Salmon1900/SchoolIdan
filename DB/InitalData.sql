-- Run to reset DB with inital date
-- Truncates all tables and inserts inital data

TRUNCATE TABLE t_jobs RESTART IDENTITY CASCADE;
TRUNCATE TABLE t_students CASCADE;
TRUNCATE TABLE t_subjects RESTART IDENTITY CASCADE;
TRUNCATE TABLE t_classes RESTART IDENTITY CASCADE;
TRUNCATE TABLE t_class_list CASCADE;
TRUNCATE TABLE t_qualified CASCADE;
TRUNCATE TABLE t_exams RESTART IDENTITY CASCADE;
TRUNCATE TABLE t_employees CASCADE;

-- Jobs Table

INSERT INTO t_jobs(job_title) VALUES
	('מנהל'),
	('מורה');
	
INSERT INTO t_subjects(subject_name) VALUES
	('מתמטיקה'),
	('אנגלית'),
	('לשון'),
	('ספורט'),
	('תנ"ך'),
	('היסטוריה'),
	('פיסיקה'),
	('חינוך');
commit;