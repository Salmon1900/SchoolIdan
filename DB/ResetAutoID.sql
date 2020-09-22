-- Reset auto incremented serial id in diffrent tables

SELECT SETVAL((SELECT pg_get_serial_sequence('t_jobs', 'job_id')), 1, false);
SELECT SETVAL((SELECT pg_get_serial_sequence('t_classes', 'class_id')), 1, false);
SELECT SETVAL((SELECT pg_get_serial_sequence('t_exams', 'exam_id')), 1, false);
SELECT SETVAL((SELECT pg_get_serial_sequence('t_subjects', 'subject_id')), 1, false);

COMMIT;