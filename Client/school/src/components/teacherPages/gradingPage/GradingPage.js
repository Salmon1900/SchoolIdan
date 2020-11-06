import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Paper, makeStyles, List, ListItem } from "@material-ui/core";
import ClassSelector from "./ClassSelector";
import { getEmployeeClasses } from "../../../api/employeeApi";
import { getClassStudents } from "../../../api/classApi";
import StudentGradingList from "./StudentGradingList";
import FormDialog from "../../general/managementPanel/FormDialog";
import SchoolManageForm from "../../general/managementPanel/SchoolManageForm";
import { gradingActions } from "../../../consts/gradingData";
import { addGradeToStudent } from "../../../api/gradingApi";
import { alertFlag } from "../../../consts/reactAlert";

// TODO:
// Selector where you see teachers active classes relevant to this year

const usePageStyles = makeStyles({
  paper: {
    margin: 40,
  },
  selector: {},
});
const GradingPage = ({ teacherId }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClass] = useState(
    classes.length ? classes[0].class_id : 0
  );

  const [gradeFormOpen, setGradeForm] = useState(false);
  const [studentToGrade, setStudentToGrade] = useState("111222013");
  const [selectedClassStudents, setSelectedClassStudents] = useState([]);
  const [action, setAction] = useState({});

  const pageClasses = usePageStyles();
  const schoolYear = useSelector((state) => state.management.schoolYear);
  const loadClasses = async () => {
    let classesData = await getEmployeeClasses(teacherId);
    let editableClasses = await classesData.filter(
      (classObj) => classObj.school_year === schoolYear && classObj.isactive
    );

    setClasses(editableClasses);
  };

  const handleGradeStudent = (studentId) => {
    setStudentToGrade(studentId);
    setGradeForm(true);
  };

  const gradeStudent = async (fieldData, selectData, formData, studentId) => {
    let success;

    await addGradeToStudent(
      studentId,
      selectedClassId,
      fieldData.grade,
      fieldData.examDate
    ).then((res) => {
      success = res.success;
      alertFlag(res.message, res.success);
    });

    return success;
  };

  useEffect(() => {
    if (teacherId) {
      loadClasses();
    }
    setAction(gradingActions({ gradeStudent }).gradeStudent);

    if (selectedClassId && teacherId) {
      loadSelectedClassStudents();
    }
  }, [selectedClassId, teacherId]);

  useEffect(() => {
    setSelectedClass("");
    setSelectedClassStudents("");
  }, [teacherId]);

  const loadSelectedClassStudents = async () => {
    await getClassStudents(selectedClassId).then((students) =>
      setSelectedClassStudents(students)
    );
  };

  return (
    <Paper elevation={0} className={pageClasses.paper}>
      {classes.length ? (
        <ClassSelector
          classList={classes}
          selectedClassId={selectedClassId}
          setSelectedClass={setSelectedClass}
        />
      ) : (
        "אין לך כיתות פעילות"
      )}
      {selectedClassStudents ? (
        <StudentGradingList
          studentList={selectedClassId ? selectedClassStudents : []}
          handleGrading={handleGradeStudent}
        />
      ) : (
        false
      )}

      <FormDialog
        name={action.name}
        isOpen={gradeFormOpen}
        closeHandler={(name) => setGradeForm(false)}
      >
        <SchoolManageForm
          handleFormDialog={(dialogStat) => setGradeForm(dialogStat)}
          handleAction={action.actionFunc}
          {...action.form}
          keyData={studentToGrade}
        />
      </FormDialog>
    </Paper>
  );
};

export default GradingPage;
