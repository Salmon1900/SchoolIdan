import React, { useState } from "react";
import {
  addNewSubject,
  deactiveSubject,
  getAllSubjects,
} from "../../../../api/subjectApi";
import { alertFlag, alertWarning } from "../../../../consts/reactAlert";
import {
  subjectPanel,
  subjectTable,
  subjectActions,
} from "../../../../consts/subjectData";
import ManagementPanel from "../../../general/managementPanel/ManagementPanel";

const SubjectManagementSection = () => {
  // Needs redux - in store
  const [subjects, setSubjects] = useState([]);

  // Need redux
  const loadSubejcts = () => {
    getAllSubjects().then((data) => setSubjects(data));
  };

  // Needs redux - a reducer?
  const addSubject = async (data) => {
    let success;
    await addNewSubject(data.subjectName).then((res) => {
      success = res.success;
      alertFlag(res.message, res.success);
    });

    return success;
  };

  //
  const removeSubject = async (fieldData, selectData = {}) => {
    let success;
    // If data sent with dropdown use that else use normal data
    if (!selectData.subjects && !Object.keys(selectData).length) {
      alertWarning("אנא מלא את כל השדות");
      return false;
    }
    await deactiveSubject(
      Object.keys(selectData).length ? selectData.subjects : fieldData
    ).then((res) => {
      alertFlag(res.message, res.success);
      success = res.success;
      if (res.success) {
        loadSubejcts();
      }
    });

    return success;
  };

  return (
    <div>
      <ManagementPanel
        title={subjectPanel.title}
        data={subjects}
        reloadData={loadSubejcts}
        tableData={subjectTable}
        actionMap={{ add: false, remove: false }}
        actions={subjectActions(
          { add: addSubject, remove: removeSubject },
          { subjects: subjects }
        )}
      />
    </div>
  );
};

export default SubjectManagementSection;
