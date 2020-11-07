import React from "react";
import MaterialTable from "material-table";
import tableIcons from "../../../consts/tableIcons";
import { Paper, TableRow, TableCell, TableBody, Table, TableHead, TableContainer} from '@material-ui/core'
import { Add, Delete } from "@material-ui/icons";
import { withStyles, makeStyles} from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  row: {
    '&:hover':{
      backgroundColor: "rgb(150, 150, 150)",
      cursor: 'pointer'
    }
  }
});

// const ManagementTable = ({
//   title,
//   columns,
//   data,
//   dataIdProperty,
//   actions,
//   openDialog,
//   closeDialog,
//   openDetails,
//   allowSearch = true,
// }) => {
//   const getTableActions = () => {
//     let tableActions = [];
//     if (actions.add) {
//       tableActions.push({
//         icon: () => <Add />,
//         tooltip: actions.add.label,
//         isFreeAction: true,
//         onClick: (event) => openDialog(actions.add.name),
//       });
//     }

//     if (actions.remove) {
//       tableActions.push({
//         icon: () => <Delete />,
//         tooltip: actions.remove.label,
//         onClick: (event, rowData) =>
//           actions.remove.actionFunc(rowData[dataIdProperty]),
//       });
//     }

//     return tableActions;
//   };

//   return (
//     <MaterialTable
//       icons={tableIcons}
//       title={title}
//       columns={columns}
//       data={data}
//       actions={getTableActions()}
//       options={{
//         actionsColumnIndex: -1,
//         search: allowSearch,
//       }}
//       localization={{
//         header: {
//           actions: "פעולות",
//         },
//         toolbar: {
//           searchTooltip: "חיפוש",
//           searchPlaceholder: "חיפוש",
//         },
//       }}
//       onRowClick={
//         openDetails
//           ? (event, rowData) => openDetails(rowData[dataIdProperty])
//           : undefined
//       }
//     />
//   );
// };




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
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label={title}>
        <TableHead>
          <TableRow>
            {columns.map(column => <StyledTableCell>{column.title}</StyledTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record) => (
            <StyledTableRow 
            key={record[dataIdProperty]} 
            onClick={openDetails ? (e) => openDetails(record[dataIdProperty]) : undefined}
            className={openDetails ? classes.row : undefined}>
              {columns.map(column => <StyledTableCell>{record[column.field]}</StyledTableCell>)}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ManagementTable;