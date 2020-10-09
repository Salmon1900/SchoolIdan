DROP TABLE IF EXISTS t_subjects CASCADE;

CREATE TABLE public.t_subjects
(
    subject_id serial NOT NULL,
    subject_name character varying(30) NOT NULL,
	isActive boolean DEFAULT true,
    PRIMARY KEY (subject_id)
);

commit;

ALTER TABLE t_subjects
    OWNER to postgres;