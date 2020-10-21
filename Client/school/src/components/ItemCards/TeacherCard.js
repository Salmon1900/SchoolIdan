import React from "react";
import { Paper, Typography } from "@material-ui/core";
import PlaceHolder from "../../res/ProfilePlaceholder.png";

const TeacherCard = ({ teacher }) => {
  return (
    <Paper elevation={0}>
      <img
        src={
          teacher.encode
            ? `data:image/jpg;base64,${teacher.encode}`
            : PlaceHolder
        }
        width="200px"
        height="200px"
      />
      <Typography component="p" variant="h6">
        {"שם המורה"}
      </Typography>
      <Typography component="p" variant="h3">
        {teacher.emp_name}
      </Typography>
      <Typography component="p" variant="h6">
        {"מספר תז"}
      </Typography>
      <Typography component="p" variant="h4">
        {teacher.emp_id}
      </Typography>
      <Typography component="p" variant="h6">
        {"תאריך לידה"}
      </Typography>
      <Typography component="p" variant="h4">
        {teacher.date_of_birth
          ? new Date(teacher.date_of_birth.slice(0, 10)).toLocaleDateString()
          : false}
      </Typography>
    </Paper>
  );
};

export default TeacherCard;
