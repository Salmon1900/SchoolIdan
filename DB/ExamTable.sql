DROP TABLE IF EXISTS public.t_exams;

CREATE TABLE public.t_exams
(
	exam_id serial NOT NULL,
	student_id character varying(9) NOT NULL,
	class_id integer NOT NULL,
	grade integer,
	exam_date date,
	PRIMARY KEY(exam_id),
	FOREIGN KEY(student_id) REFERENCES public.t_students(student_id),
	FOREIGN KEY(class_id) REFERENCES public.t_classes(class_id)
);

commit;

ALTER TABLE public.t_exams
    OWNER to postgres;