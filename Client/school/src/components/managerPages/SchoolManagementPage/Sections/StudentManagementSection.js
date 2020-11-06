import {
  Button,
  Dialog,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  addNewStudent,
  deleteStudentById,
  getStudentList,
  getStudentById,
} from "../../../../api/studentApi";
import ManagementPanel from "../../../general/managementPanel/ManagementPanel";
import {
  studentPanel,
  studentActions,
  studentTable,
} from "../../../../consts/studentData";
import EntityManager from "../../../general/managementPanel/EntityManager";
import StudentCard from "../../../ItemCards/StudentCard";
import EntityDialog from "../../../general/managementPanel/EntityDialog";
import { alertFlag, alertSuccess } from "../../../../consts/reactAlert";
// import AddStudentForm from './AddStudentForm';

const useButtonPanelStyles = makeStyles({
  panel: {
    paddingTop: 10,
  },
  button: {
    fontSize: 18,
    width: "20vh",
  },
});

const StudentManagementSection = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});

  const removeStudent = async (id) => {
    let success;
    await deleteStudentById(id).then((res) => {
      alertFlag(res.message, res.success);
      success = res.success;
      if (res.success) {
        loadStudents();
      }
    });

    return success;
  };

  const loadStudents = () => {
    getStudentList().then((data) => setStudents(data));
  };

  const addStudent = async (data) => {
    let student = {
      id: data.idNumber,
      name: `${data.firstName} ${data.lastName}`,
      birthYear: data.birthYear,
    };

    let success;

    await addNewStudent(student).then((res) => {
      success = res.success;
      alertFlag(res.message, res.success);
    });

    return success;
  };

  const openStudent = async (studentId) => {
    await getStudentById(studentId).then((stud) => setSelectedStudent(stud));
  };

  const closeStudent = () => {
    setSelectedStudent({});
  };

  return (
    <div>
      <ManagementPanel
        title={studentPanel.title}
        data={students}
        reloadData={loadStudents}
        // tableData={{ ...studentTable, openDetails: openStudent }}
        tableData={{ ...studentTable }}
        actionMap={{ add: false, remove: false }}
        actions={studentActions({ add: addStudent, remove: removeStudent })}
      />
      <EntityDialog
        isOpen={Boolean(Object.keys(selectedStudent).length)}
        closeHandler={closeStudent}
      >
        <EntityManager
          entityId={selectedStudent.student_id}
          EntityCard={<StudentCard student={selectedStudent} />}
        />
      </EntityDialog>
    </div>
  );
};

export default StudentManagementSection;
