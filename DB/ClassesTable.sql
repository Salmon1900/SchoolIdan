DROP TABLE IF EXISTS public.t_classes;

CREATE TABLE public.t_classes
(
	class_id serial NOT NULL,
	class_name character varying(40) NOT NULL,
	student_birth_year character varying(4),
	school_year character varying(4),
	teacher_id character varying(9) NOT NULL,
	subject_id integer NOT NULL,
	PRIMARY KEY(class_id),
	FOREIGN KEY(teacher_id) REFERENCES public.t_employees(emp_id),
	FOREIGN KEY(subject_id) REFERENCES public.t_subjects(subject_id)
);


commit;

ALTER TABLE public.t_classes
    OWNER to postgres;