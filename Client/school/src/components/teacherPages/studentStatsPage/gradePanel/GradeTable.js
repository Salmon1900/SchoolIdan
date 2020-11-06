import React from "react";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    height: "50vh",
    overflowY: "scroll",
  },
  item: {
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },
}));

const GradeTable = ({ grades, isAvg = false }) => {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      {grades.map((grade, index) => (
        <ListItem key={index} className={classes.item}>
          <ListItemText primary={grade.student_name} />
          <ListItemSecondaryAction>
            {Math.round(grade.grade)}
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default GradeTable;

// Old Table version

// import MaterialTable from "material-table";
// import { gradeTableData } from "../../../../consts/gradingData";
// import tableIcons from "../../../../consts/tableIcons";

// <MaterialTable
//   icons={tableIcons}
//   columns={isAvg ? gradeTableData.avgColumns : gradeTableData.columns}
//   data={grades}
//   options={{
//     search: false,
//   }}
// />
