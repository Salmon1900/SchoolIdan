import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import ClassManagementPage from "../../teacherPages/classManagementPage/ClassManagementPage";
import StudentStatsPage from "../../teacherPages/studentStatsPage/StudentStatsPage";
import TeacherSelector from "./TeacherSelector";

const StudentStatsInspectionPage = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  return (
    <Paper elevation={0}>
      <TeacherSelector
        selected={selectedTeacher}
        setSelectedTeacher={setSelectedTeacher}
      />
      <StudentStatsPage teacherId={selectedTeacher} />
    </Paper>
  );
};

export default StudentStatsInspectionPage;
