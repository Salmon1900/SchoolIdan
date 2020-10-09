import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../../../../consts/tableIcons';
import { Add, Delete } from '@material-ui/icons'
const StudentListTable = ({students, removeStudent, handleAddDialog}) => {
    return (
        <MaterialTable
        icons={tableIcons}
        title="רשימת תלמידי בית הספר"
        columns={[
          { title: 'מספר תז', field: 'student_id' },
          { title: 'שם תלמיד', field: 'student_name' },
          { title: 'שנת לידה', field: 'birth_year' },
        ]}
        data={students}        
        actions={[
          {
            icon: () => <Add/>,
            tooltip: 'הוספת תלמיד',
            isFreeAction: true,
            onClick: (event) => handleAddDialog(true)
          },
          {
            icon: () => <Delete/>,
            tooltip: 'מחיקת תלמיד',
            onClick: (event, rowData) => removeStudent(rowData.student_id)
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={{
          header: {
            actions: 'מחיקה'
          },
          toolbar: {
            searchTooltip: "חיפוש",
            searchPlaceholder: "חיפוש"
          }
        }}
      />
    )
}

export default StudentListTable;

