DROP TABLE IF EXISTS public.t_employees CASCADE;

CREATE TABLE public.t_employees
(
    emp_id character varying(9) NOT NULL,
    emp_name character varying(40) NOT NULL,
    password text NOT NULL,
    date_of_birth date,
    is_fired boolean NOT NULL DEFAULT 'false',
	job_id integer NOT NULL, 
	gender character varying(20),
	picture bytea,
    PRIMARY KEY (emp_id),
	FOREIGN KEY(job_id) REFERENCES public.t_jobs(job_id)
);

commit;

ALTER TABLE public.t_employees
    OWNER to postgres;