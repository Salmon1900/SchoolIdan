DROP TABLE IF EXISTS public.t_jobs;

CREATE TABLE public.t_jobs
(
    job_id serial NOT NULL,
    job_title character varying(30) NOT NULL,
    PRIMARY KEY (job_id)
);

commit;

ALTER TABLE public.t_jobs
    OWNER to postgres;