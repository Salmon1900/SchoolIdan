import React, { useState } from 'react';
import { addNewSubject, deactiveSubject, getAllSubjects } from '../../../../api/subjectApi';
import { panel } from '../../../../consts/subjectData'
import ManagementPanel from '../../../general/managementPanel/ManagementPanel';

const SubjectManagementSection = () => {
    // Needs redux - in store
    const [subjects, setSubjects] = useState([]);

    // Need redux
    const loadSubejcts = () => {
        getAllSubjects().then(data => setSubjects(data));
    }

    // Needs redux - a reducer?
    const addSubject = async (data) => {
        let success;
        await addNewSubject(data.subjectName).then(res => {
            success = res.success
            alert(res.message)
        })

        return success;
    }

    //
    const removeSubject = async (id) => {
        let success;
        await deactiveSubject(id).then(res => {
            alert(res.message)
            success=res.success;
            if (res.success) {
                loadSubejcts()
            }
        })

        return success
    }

    return(
        <div>
            <ManagementPanel
                title={panel.title}
                data={subjects}
                reloadData={loadSubejcts}
                tableData={panel.table}
                addItem={addSubject}
                addButtonLabel={panel.addButtonLabel}
                addFormData={panel.addForm}
                removeItem={removeSubject}
                removeButtonLabel={panel.removeButtonLabel}
                // removeFormData={panel.removeForm}
                />
        </div>
    )
}

export default SubjectManagementSection;