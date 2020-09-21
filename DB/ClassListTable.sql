DROP TABLE IF EXISTS t_class_list;

CREATE TABLE public.t_class_list
(
    student_id character varying(9) NOT NULL,
    class_id integer NOT NULL,
    PRIMARY KEY (student_id, class_id),
	FOREIGN KEY(student_id) REFERENCES public.t_students(student_id),
	FOREIGN KEY(class_id) REFERENCES public.t_classes(class_id)
);

commit;

ALTER TABLE public.t_class_list
    OWNER to postgres;