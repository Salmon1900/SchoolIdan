import React from "react";
import { Card, Typography } from "@material-ui/core";

const StudentCard = ({ student }) => {
  return (
    <Card>
      <Typography component="p" variant="h6">
        {"שם התלמיד"}
      </Typography>
      <Typography component="h1" variant="h1">
        {student.student_name}
      </Typography>
      <Typography component="p" variant="h6">
        {"מספר תז"}
      </Typography>
      <Typography component="h2" variant="h2">
        {student.student_id}
      </Typography>
      <Typography component="p" variant="h6">
        {"שנת לידה"}
      </Typography>
      <Typography component="h2" variant="h2">
        {student.birth_year}
      </Typography>
    </Card>
  );
};

export default StudentCard;
