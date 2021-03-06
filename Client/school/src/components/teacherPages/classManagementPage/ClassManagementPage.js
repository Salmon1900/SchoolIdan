import React, { useEffect, useState } from "react";
import ClassSummaryCard from "../../ItemCards/ClassSummaryCard";
import { Grid } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import { getEmployeeClasses } from "../../../api/employeeApi";
import { getSubject } from "../../../api/subjectApi";
import {
  getClassStudentCount,
  getClass,
  getClassStudents,
  removeStudentFromClass,
  addStudentToClass,
} from "../../../api/classApi";
import ClassCard from "../../ItemCards/ClassCard";
import EntityManager from "../../general/managementPanel/EntityManager";
import EntityDialog from "../../general/managementPanel/EntityDialog";
import { classItemActions } from "../../../consts/classData";
import { getStudentAgeGroup } from "../../../api/studentApi";
import SchoolYearSelector from "../SchoolYearSelector";
import { alertFlag, alertWarning } from "../../../consts/reactAlert";

const ClassManagementPage = ({ teacherId }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
  const [selectedClassData, setSelectedClassData] = useState({});
  const currentSchoolYear = useSelector(state => state.management.schoolYear);
  const selectedSchoolYear = useSelector(state => state.management.selectedSchoolYear);
  //   const [classes, setClasses] = useState([]);

  const loadClasses = async () => {
    let classesData = await getEmployeeClasses(teacherId);

    setClasses(classesData);
  };

  const openClass = (id) => {
    getClass(id).then((classObj) => setSelectedClass(classObj));
  };

  const closeClass = () => {
    setSelectedClass({});
  };

  useEffect(() => {
    if (teacherId) {
      loadClasses();
    }

    if (selectedClass.class_id) {
      loadSelectedClassData();
    }
  }, [selectedClass.class_id, teacherId]);

  const loadSelectedClassData = async () => {
    let data = {};
    await getClassStudents(selectedClass.class_id).then(
      (students) => (data["students"] = students)
    );
    await getStudentAgeGroup(selectedClass.student_birth_year).then(
      (students) => (data["studentsInAgeGroup"] = students)
    );

    // Filter students in age group and save as available only students that are not in class
    data["availableStudents"] = await data["studentsInAgeGroup"].filter(
      (student) =>
        !Boolean(
          data["students"].find(
            (stud) => stud.student_id === student.student_id
          )
        )
    );

    setSelectedClassData(data);
  };

  const addStudent = async (fieldData, selectData = {}) => {
    let success;

    if (!selectData.availableStudents) {
      alertWarning("אנא מלא את כל השדות");
      return false;
    }
    await addStudentToClass(
      selectedClass.class_id,
      selectData.availableStudents
    ).then((res) => {
      alertFlag(res.message, res.success);
      success = res.success;
      if (res.success) {
        loadSelectedClassData();
      }
    });

    return success;
  };

  const removeStudent = async (fieldData, selectData = {}) => {
    let success;
    if (!selectData.students) {
      alertWarning("אנא מלא את כל השדות");
      return false;
    }
    await removeStudentFromClass(
      selectedClass.class_id,
      selectData.students
    ).then((res) => {
      alertFlag(res.message, res.success);
      success = res.success;
      if (res.success) {
        loadSelectedClassData();
      }
    });

    return success;
  };

  const classActionConditions = () => {
    let classStudents = selectedClassData["students"];
    let availableStudents = selectedClassData["availableStudents"];
    
    if(selectedClass.school_year !== currentSchoolYear){
      return {
        addStudent: false,
        removeStudent: false,
      };
    }
    
    if (classStudents && availableStudents) {
      return {
        addStudent: Boolean(availableStudents.length),
        removeStudent: Boolean(classStudents.length),
      };
    } else {
      return {
        addStudent: false,
        removeStudent: false,
      };
    }
  };

  return (
    <div>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <SchoolYearSelector />
        </Grid>
        {classes.length ? (
          classes.map((classObj) => {
            return classObj.school_year === selectedSchoolYear ? (
              <Grid item xs={4} key={classObj.class_id}>
                <ClassSummaryCard
                  classObj={classObj}
                  openClass={openClass}
                  isSelected={Object.keys(selectedClass).length}
                />
              </Grid>
            ) : false;
          })
        ) : (
            <Grid item xs={12}>
              לא קיימות כיתות
            </Grid>
          )}
      </Grid>

      <EntityDialog
        isOpen={Boolean(Object.keys(selectedClass).length)}
        closeHandler={closeClass}
      >
        <EntityManager
          entityId={selectedClass.class_id}
          EntityCard={
            <ClassCard
              classObj={selectedClass}
              studentList={selectedClassData["students"]}
            />
          }
          reloadEntityData={loadSelectedClassData}
          actionMap={{
            addStudent: false,
            removeStudent: false,
          }}
          actions={classItemActions(
            { addStudent, removeStudent },
            selectedClassData,
            classActionConditions()
          )}
        />
      </EntityDialog>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     teacherId: state.user.id,
//   };
// };

// export default connect(mapStateToProps, null)(ClassManagementPage);
export default ClassManagementPage;
