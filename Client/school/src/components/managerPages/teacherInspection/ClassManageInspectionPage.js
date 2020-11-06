import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import ClassManagementPage from "../../teacherPages/classManagementPage/ClassManagementPage";
import TeacherSelector from "./TeacherSelector";

const ClassManageInspectionPage = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  return (
    <Paper elevation={0}>
      <TeacherSelector
        selected={selectedTeacher}
        setSelectedTeacher={setSelectedTeacher}
      />
      <ClassManagementPage teacherId={selectedTeacher} />
    </Paper>
  );
};

export default ClassManageInspectionPage;
