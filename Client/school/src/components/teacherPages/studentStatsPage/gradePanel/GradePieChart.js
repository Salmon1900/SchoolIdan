import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core";
import { ranges } from "../../../../consts/gradingData";

const useStyles = makeStyles({
  container: {
    height: "25vh",
    width: "50vh",
  },
});
const GradePieChart = ({ grades, devision = [40, 30, 20, 10] }) => {
  const classes = useStyles();

  const data = {
    datasets: [
      {
        data: devision,
        backgroundColor: ["red", "orange", "yellow", "green"],
      },
    ],
    labels: [
      `נכשל`,
      `${ranges.fail + 1}-${ranges.low}`,
      `${ranges.low + 1}-${ranges.medium}`,
      `${ranges.medium + 1}-${ranges.high}`,
    ],
  };

  return (
    <div className={classes.container}>
      <Pie data={data} />
    </div>
  );
};

export default GradePieChart;
