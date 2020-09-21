DROP TABLE IF EXISTS t_qualified;

CREATE TABLE public.t_qualified
(
    subject_id integer NOT NULL,
    emp_id character varying(9) NOT NULL,
    PRIMARY KEY (subject_id, emp_id),
	FOREIGN KEY(subject_id) REFERENCES public.t_subjects(subject_id),
	FOREIGN KEY(emp_id) REFERENCES public.t_employees(emp_id)
);

commit;

ALTER TABLE public.t_qualified
    OWNER to postgres;