import React, { useState, useEffect } from "react";
import GradePanel from "./gradePanel/GradePanel";
import {
  getTeacherStudentAvg,
  getTeacherSubjectGrades,
  getClassGrades,
  getTeacherAgeGroupGrades,
} from "../../../api/gradingApi";
import {
  getEmployeeQualifications,
  getEmployeeClasses,
  getTeacherAgeGroups,
  getEmployeeClassesForYear,
} from "../../../api/employeeApi";
import { Paper, Grid, Typography } from "@material-ui/core";
import { gradeStatSections as sections } from "../../../consts/gradingData";
import { useSelector } from "react-redux";
import SchoolYearSelector from "../SchoolYearSelector";

const StudentStatsPage = ({ teacherId }) => {
  const [loading, setLoading] = useState(true);
  const [qualfications, setQualifications] = useState([]);
  const [classes, setClasses] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);
  const selectedYear = useSelector(state => state.management.selectedSchoolYear);

  useEffect(() => {
    Promise.all([loadQualifications(), loadClasses(), loadAgeGroups()]);
    // loadGradeData();
  }, [selectedYear]);

  // Get all students - avg grades
  const loadStudentAvgList = async () => {
    getTeacherStudentAvg(teacherId, selectedYear);
  };

  const loadQualifications = () => {
    getEmployeeQualifications(teacherId).then((qualif) =>
      setQualifications(qualif)
    );
  };

  const loadSubjectGrades = (subjectId) =>
    getTeacherSubjectGrades(teacherId, subjectId, selectedYear);

  const loadClasses = () => {
    getEmployeeClassesForYear(teacherId, selectedYear).then((classes) => setClasses(classes));
  };

  const loadClassGrades = (classId) => getClassGrades(classId);

  const loadAgeGroups = () => {
    getTeacherAgeGroups(teacherId).then((ageGroups) => setAgeGroups(ageGroups));
  };

  const loadAgeGroupGrades = (ageGroup) =>
    getTeacherAgeGroupGrades(teacherId, ageGroup, selectedYear);

  const renderPanels = (
    categoryList,
    idProperty,
    nameProperty,
    loadGradesFunc
  ) => {
    return categoryList.map((category) => (
      <Grid item xs={4} key={category[idProperty]}>
        <GradePanel
          id={category[idProperty]}
          title={category[nameProperty]}
          loadGrades={loadGradesFunc}
          yearOfData={selectedYear}
        />
      </Grid>
    ));
  };

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12}>
          <SchoolYearSelector/>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h3" variant="h3">
            {sections.allAvg}
          </Typography>
        </Grid>
        {/* {renderPanels(studentAvgList)} */}
        <Grid item xs={12}>
          <Typography component="h3" variant="h3">
            {sections.bySubject.title}
          </Typography>
        </Grid>
        {renderPanels(
          qualfications,
          sections.bySubject.idProperty,
          sections.bySubject.nameProperty,
          loadSubjectGrades
        )}
        <Grid item xs={12}>
          <Typography component="h3" variant="h3">
            {sections.byClass.title}
          </Typography>
        </Grid>
        {renderPanels(
          classes,
          sections.byClass.idProperty,
          sections.byClass.nameProperty,
          loadClassGrades
        )}
        <Grid item xs={12}>
          <Typography component="h3" variant="h3">
            {sections.byAge.title}
          </Typography>
        </Grid>
        {renderPanels(
          ageGroups,
          sections.byAge.idProperty,
          sections.byAge.nameProperty,
          loadAgeGroupGrades
        )}
      </Grid>
    </Paper>
  );
};

export default StudentStatsPage;

// const loadGradeData = async () => {
//   // await loadStudentAvgList();
//   // await loadTeacherSubjectList();
//   // await loadTeacherClassList();
//   // await loadTeacherAgeGroupList();
//   Promise.all([
//     loadStudentAvgList(),
//     loadTeacherSubjectList(),
//     loadTeacherClassList(),
//     loadTeacherAgeGroupList(),
//   ]).then(() => {
//     setLoading(false);
//     console.log("Finished loading");
//   });
// };

// // Get all teacher qualfications
// // For every subject get grades
// const loadTeacherSubjectList = async () => {
//   getEmployeeQualifications(teacherId).then(async (subjects) => {
//     let subjectGrades = [];
//     await subjects.forEach(async (subject) => {
//       let gradeData = { name: subject.subject_name, grades: [] };
//       gradeData["grades"] = await getTeacherSubjectGrades(
//         teacherId,
//         subject.subject_id
//       );
//       subjectGrades.push(gradeData);
//     });

//     setSubjectGrades(subjectGrades);
//   });
// };

// // Get all teacher classes
// const loadTeacherClassList = async () => {
//   getEmployeeClasses(teacherId).then(async (classes) => {
//     let classGrades = [];
//     await classes.forEach(async (classObj) => {
//       let gradeData = { name: classObj.class_name, grades: [] };
//       gradeData["grades"] = await getClassGrades(classObj.class_id);
//       classGrades.push(gradeData);
//     });

//     setClassGrades(classGrades);
//   });
// };
// // For every class get grades

// // Get teacher tought age groups
// // For every age group get grades
// const loadTeacherAgeGroupList = async () => {
//   getTeacherAgeGroups(teacherId).then(async (ageGroups) => {
//     let ageGroupGrades = [];
//     await ageGroups.forEach(async (ageGroup) => {
//       let gradeData = {
//         name: ageGroup.student_birth_year,
//         grades: [],
//       };
//       gradeData["grades"] = await getTeacherAgeGroupGrades(
//         teacherId,
//         ageGroup.student_birth_year
//       );
//       ageGroupGrades.push(gradeData);
//     });

//     setAgeGroupGrades(ageGroupGrades);
//   });
// };
