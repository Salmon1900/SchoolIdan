DROP TABLE IF EXISTS public.t_subjects;

CREATE TABLE public.t_subjects
(
    subject_id serial NOT NULL,
    subject_name character varying(30) NOT NULL,
    PRIMARY KEY (subject_id)
);

commit;

ALTER TABLE public.t_subjects
    OWNER to postgres;