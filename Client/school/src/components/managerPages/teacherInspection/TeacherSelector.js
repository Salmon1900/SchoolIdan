import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getHiredTeachers } from "../../../api/employeeApi";

const useStyles = makeStyles({
  select: {
    width: "15vw",
    marginTop: "20px",
  },
});
const TeacherSelector = ({ selected, setSelectedTeacher }) => {
  const [teachers, setTeachers] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    getHiredTeachers().then((teacherList) => setTeachers(teacherList));
  }, []);

  return (
    <FormControl variant="outlined" className={classes.select}>
      <InputLabel>מורה</InputLabel>
      <Select
        value={selected ? selected : ""}
        variant="outlined"
        label="מורה"
        onChange={(e) => setSelectedTeacher(e.target.value)}
      >
        {teachers.map((teacher) => (
          <MenuItem key={teacher.emp_id} value={teacher.emp_id}>
            {teacher.emp_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TeacherSelector;
