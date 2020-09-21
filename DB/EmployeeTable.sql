DROP TABLE IF EXISTS public.t_employees;

CREATE TABLE public.t_employees
(
    emp_id character varying(9) NOT NULL,
    emp_name character varying(40) NOT NULL,
    password integer NOT NULL,
    date_or_birth date,
    is_fired boolean NOT NULL DEFAULT 'false',
	job_id integer NOT NULL, 
    PRIMARY KEY (emp_id),
	FOREIGN KEY(job_id) REFERENCES public.t_jobs(job_id)
);

commit;

ALTER TABLE public.t_employees
    OWNER to postgres;