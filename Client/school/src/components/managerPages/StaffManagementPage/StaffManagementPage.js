import React, { useState, useEffect } from "react";
import { roles } from "../../../roles";
import {
  addNewEmployee,
  fireTeacherById,
  getHiredTeachers,
  getEmployeeById,
  addQualificationToEmp,
  removeEmpQualification,
  getEmployeeQualifications,
  getSubjectsEmpNotQualifiedFor,
  getEmployeeClasses,
} from "../../../api/employeeApi";
import {
  staffPanel,
  staffTable,
  staffActions,
  staffItemActions,
} from "../../../consts/staffData";
import ManagementPanel from "../../general/managementPanel/ManagementPanel";
import EntityDialog from "../../general/managementPanel/EntityDialog";
import EntityManager from "../../general/managementPanel/EntityManager";
import TeacherCard from "../../ItemCards/TeacherCard";
import { connect } from "react-redux";
import { createNewClass, deactivateClass } from "../../../api/classApi";
import { BlockOutlined } from "@material-ui/icons";

const StaffManagementPage = ({ schoolYear }) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [selectedTeacherData, setSelectedTeacherData] = useState({});

  const addTeacher = async (data, selectData, fileData) => {
    let newEmp = {
      id: data.teacherId,
      firstName: data.fullName,
      lastName: "",
      dateOfBirth: data.dateOfBirth,
      jobId: roles.TEACHER,
      password: data.password,
      picture: fileData[0],
    };

    let success;
    await addNewEmployee(newEmp).then((res) => {
      success = res.success;
      alert(res.message);
    });

    return success;
  };

  const fireTeacher = async (id) => {
    let success;
    await fireTeacherById(id).then((res) => {
      alert(res.message);
      success = res.success;
      if (res.success) {
        loadTeachers();
      }
    });

    return success;
  };

  const addQualif = async (fieldData, selectData = {}) => {
    let success;
    if (!selectData.availableSubjects) {
      alert("אנא בחר מקצוע להוספה");
      return false;
    }
    await addQualificationToEmp(
      selectedTeacher.emp_id,
      selectData.availableSubjects
    ).then((res) => {
      alert(res.message);
      success = res.success;
      if (res.success) {
        loadSelectedTeacherData();
      }
    });

    return success;
  };

  const removeQualif = async (fieldData, selectData = {}) => {
    let success;
    if (!selectData.qualifications) {
      alert("אנא בחר מקצוע להסרה");
      return false;
    }
    await removeEmpQualification(
      selectedTeacher.emp_id,
      selectData.qualifications
    ).then((res) => {
      alert(res.message);
      success = res.success;
      if (res.success) {
        loadSelectedTeacherData();
      }
    });

    return success;
  };

  const assignClass = async (fieldData, selectData = {}) => {
    let success;
    if (!selectData.qualifications) {
      alert("אנא מלא את כל השדות");
      return false;
    }
    await createNewClass({
      name: fieldData.className,
      subjectId: selectData.qualifications,
      teacherId: selectedTeacher.emp_id,
      birthYear: fieldData.birthYear,
      schoolYear: schoolYear,
    }).then((res) => {
      alert(res.message);
      success = res.success;
      if (res.success) {
        loadSelectedTeacherData();
      }
    });

    return success;
  };

  const deassignClass = async (fieldData, selectData = {}) => {
    let success;
    if (!selectData.toughtClasses) {
      alert("אנא בחר כיתה");
      return false;
    }

    await deactivateClass(selectData.toughtClasses).then((res) => {
      alert(res.message);
      success = res.success;
      if (res.success) {
        loadSelectedTeacherData();
      }
    });

    return success;
  };

  const loadTeachers = () => {
    getHiredTeachers().then((res) => setTeachers(res));
  };

  useEffect(() => {
    if (selectedTeacher.emp_id) {
      loadSelectedTeacherData();
    }
  }, [selectedTeacher.emp_id]);

  const loadSelectedTeacherData = async () => {
    let data = {};
    await getEmployeeQualifications(selectedTeacher.emp_id).then((subjects) => {
      data["qualifications"] = subjects;
    });
    await getSubjectsEmpNotQualifiedFor(selectedTeacher.emp_id).then(
      (subjects) => (data["availableSubjects"] = subjects)
    );
    await getEmployeeClasses(selectedTeacher.emp_id).then(
      (classes) =>
        (data["toughtClasses"] = classes.filter(
          (classObj) => classObj.isactive
        ))
    );
    setSelectedTeacherData(data);
  };

  const openTeacher = (id) => {
    getEmployeeById(id).then((emp) => setSelectedTeacher(emp));
  };

  const closeTeacher = () => {
    setSelectedTeacher({});
  };

  const teacherActionCondtions = () => {
    let qualif = selectedTeacherData["qualifications"];
    let classes = selectedTeacherData["toughtClasses"];
    if (qualif && classes) {
      let hasQualif = Boolean(qualif.length);
      let hasClasses = Boolean(classes.length);
      if (hasQualif && hasClasses) {
        return {
          addQualif: true,
          removeQualif: true,
          assignClass: true,
          deassignClass: true,
        };
      } else if (hasQualif) {
        return {
          addQualif: true,
          removeQualif: true,
          assignClass: true,
          deassignClass: false,
        };
      } else {
        return {
          addQualif: false,
          removeQualif: false,
          assignClass: false,
          deassignClass: false,
        };
      }
    } else {
      return {
        addQualif: true,
        removeQualif: true,
        assignClass: true,
        deassignClass: true,
      };
    }
  };

  return (
    <div>
      <ManagementPanel
        title={staffPanel.title}
        data={teachers}
        reloadData={loadTeachers}
        tableData={{ ...staffTable, openDetails: openTeacher }}
        actionMap={{ add: false, remove: false }}
        actions={staffActions({ add: addTeacher, remove: fireTeacher })}
      />
      <EntityDialog
        isOpen={Boolean(Object.keys(selectedTeacher).length)}
        closeHandler={closeTeacher}
      >
        <EntityManager
          entityId={selectedTeacher.emp_id}
          EntityCard={<TeacherCard teacher={selectedTeacher} />}
          reloadEntityData={loadSelectedTeacherData}
          actionMap={{
            addQualif: false,
            removeQualif: false,
            assignClass: false,
            deassignClass: false,
          }}
          actions={staffItemActions(
            { addQualif, removeQualif, assignClass, deassignClass },
            selectedTeacherData,
            teacherActionCondtions()
          )}
        />
      </EntityDialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    schoolYear: state.management.schoolYear,
  };
};

export default connect(mapStateToProps, null)(StaffManagementPage);
