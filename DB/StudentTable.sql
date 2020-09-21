DROP TABLE IF EXISTS public.t_students;

CREATE TABLE public.t_students
(
    "student_id" character varying(9) NOT NULL,
    "student_name" character varying(40) NOT NULL,
    "birth_year" character varying(4) NOT NULL,
    PRIMARY KEY (student_id)
);

commit;

ALTER TABLE public.t_students
    OWNER to postgres;