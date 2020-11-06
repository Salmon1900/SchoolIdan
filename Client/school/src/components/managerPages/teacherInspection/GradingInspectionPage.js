import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import GradingPage from "../../teacherPages/gradingPage/GradingPage";
import TeacherSelector from "./TeacherSelector";

const GradingInspectionPage = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  return (
    <Paper elevation={0}>
      <TeacherSelector
        selected={selectedTeacher}
        setSelectedTeacher={setSelectedTeacher}
      />
      <GradingPage teacherId={selectedTeacher} />
    </Paper>
  );
};

export default GradingInspectionPage;
