import React, { useState, useEffect } from "react";
import GradePieChart from "./GradePieChart";
import GradeTable from "./GradeTable";
import { Paper, makeStyles, Typography } from "@material-ui/core";
import { ranges } from "../../../../consts/gradingData";

const useStyles = makeStyles((theme) => ({
  paper: {
    border: `1px solid ${theme.palette.primary.main}`,
    margin: 15,
  },
}));
const GradePanel = ({ id = "", title, loadGrades }) => {
  const [grades, setGrades] = useState([]);
  const [devision, setDevision] = useState([25, 25, 25, 25]);

  const loadDevision = async (gradesData) => {
    let newDevision = [0, 0, 0, 0];
    await gradesData.forEach((gradeObj) => {
      newDevision[getGradeRangeIndex(Number(gradeObj.grade))]++;
    });
    setDevision(newDevision);
  };

  const getGradeRangeIndex = (grade) => {
    if (grade <= ranges.fail) return 0;
    else if (grade > ranges.fail && grade <= ranges.low) return 1;
    else if (grade > ranges.low && grade <= ranges.medium) return 2;
    else return 3;
  };

  useEffect(() => {
    loadGrades(id).then((grades) => {
      setGrades(grades);
      loadDevision(grades);
    });
  }, []);
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography component="h5" variant="h5">
        {title}
      </Typography>
      <GradeTable grades={grades} />
      <GradePieChart grades={grades} devision={devision} />
    </Paper>
  );
};

export default GradePanel;
