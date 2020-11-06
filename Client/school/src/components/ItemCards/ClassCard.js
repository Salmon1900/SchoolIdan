import React, { useEffect, useState } from "react";
import { makeStyles, Paper, Typography, Grid } from "@material-ui/core";
import ManagementTable from "../general/managementPanel/ManagementTable";
import { classStudentsTable } from "../../consts/classData";
import { getSubject } from "../../api/subjectApi";
import { BorderLeft } from "@material-ui/icons";

const useClassStyles = makeStyles({
  card: {
    height: "60vh",
    width: "90%",
  },
  emptyMsg: {
    paddingTop: 200, 
  }
});

const ClassCard = ({ classObj, studentList = [] }) => {
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    getSubject(classObj.subject_id).then((subject) =>
      setSubjectName(subject.subject_name)
    );
  }, []);

  const classCardClasses = useClassStyles();
  return (
    <Paper elevation={0} className={classCardClasses.card}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography component="h3" variant="h3">
            {`${classObj.class_name} - ${subjectName}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {studentList.length ? (
            <ManagementTable
              {...classStudentsTable}
              data={studentList}
              actions={{}}
              allowSearch={false}
            />
          ) : (
            <Typography component="h5" variant="h5" className={classCardClasses.emptyMsg}>
              לכיתה זו אין תלמידים רשומים
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ClassCard;
