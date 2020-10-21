import React from "react";
import MaterialTable from "material-table";
import tableIcons from "../../../consts/tableIcons";
import { Add, Delete } from "@material-ui/icons";
const ManagementTable = ({
  title,
  columns,
  data,
  dataIdProperty,
  actions,
  openDialog,
  closeDialog,
  openDetails,
  allowSearch = true,
}) => {
  const getTableActions = () => {
    let tableActions = [];
    if (actions.add) {
      tableActions.push({
        icon: () => <Add />,
        tooltip: actions.add.label,
        isFreeAction: true,
        onClick: (event) => openDialog(actions.add.name),
      });
    }

    if (actions.remove) {
      tableActions.push({
        icon: () => <Delete />,
        tooltip: actions.remove.label,
        onClick: (event, rowData) =>
          actions.remove.actionFunc(rowData[dataIdProperty]),
      });
    }

    return tableActions;
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title={title}
      columns={columns}
      data={data}
      actions={getTableActions()}
      options={{
        actionsColumnIndex: -1,
        search: allowSearch,
      }}
      localization={{
        header: {
          actions: "פעולות",
        },
        toolbar: {
          searchTooltip: "חיפוש",
          searchPlaceholder: "חיפוש",
        },
      }}
      onRowClick={
        openDetails
          ? (event, rowData) => openDetails(rowData[dataIdProperty])
          : undefined
      }
    />
  );
};

export default ManagementTable;
