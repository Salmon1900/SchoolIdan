import { Button, Dialog, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { addNewStudent, deleteStudentById, getStudentList } from '../../../../api/studentApi';
import ManagementPanel from '../../../general/managementPanel/ManagementPanel';
import { panel } from "../../../../consts/studentData";
// import AddStudentForm from './AddStudentForm';

const useButtonPanelStyles = makeStyles({
    panel: {
        paddingTop: 10
    },
    button: {
        fontSize: 18,
        width: "20vh"
    }
})

const StudentManagementSection = () => {
    const [students, setStudents] = useState([]);

    const removeStudent = async (id) => {
        let success;
        await deleteStudentById(id).then(res => {
            alert(res.message)
            success=res.success;
            if (res.success) {
                loadStudents()
            }
        })

        return success
    }

    const loadStudents = () => {
        getStudentList().then(data => setStudents(data));
    }

    const addStudent = async (data) => {
        let student = {
            id: data.idNumber,
            name: `${data.firstName} ${data.lastName}`,
            birthYear: data.birthYear,
        }

        let success;

        await addNewStudent(student).then(res => {
            success = res.success
            alert(res.message)
        })

        return success 
    }

    return (
        <div>
            <ManagementPanel
            title={panel.title}
            data={students}
            reloadData={loadStudents}
            tableData={panel.table}
            addItem={addStudent}
            addButtonLabel={panel.addButtonLabel}
            addFormData={panel.addForm}
            removeItem={removeStudent}
            removeButtonLabel={panel.removeButtonLabel}
            removeFormData={panel.removeForm}/>

        </div>
    )
}

export default StudentManagementSection;