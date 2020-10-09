import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../../../consts/tableIcons';
import { Add, Delete } from '@material-ui/icons'
const ManagementTable = ({title, columns, data, dataIdProperty, addLabel, deleteLabel, removeItem, handleAddDialog}) => {
    return (
        <MaterialTable
        icons={tableIcons}
        title={title}
        columns={columns}
        data={data}        
        actions={[
          {
            icon: () => <Add/>,
            tooltip: addLabel,
            isFreeAction: true,
            onClick: (event) => handleAddDialog(true)
          },
          {
            icon: () => <Delete/>,
            tooltip: deleteLabel,
            onClick: (event, rowData) => removeItem(rowData[dataIdProperty])
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

export default ManagementTable;

