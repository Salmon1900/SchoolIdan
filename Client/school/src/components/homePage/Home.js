import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../../api/employeeApi";
import EmployeeList from "./EmployeeList";
import BirthdayCard from "./BirthdayCard";
import { socket } from "../../api/socket";
import { alertSuccess } from "../../consts/reactAlert";

// Flipped because jss
const useStyles = makeStyles({
  list: {
    textAlign: "left",
  },
});

const Home = () => {
  const [employees, setEmployeeList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getAllEmployees().then((res) => {
      setEmployeeList(res);
      console.log(res);
    });

    socket.on("newEmp", (data) => {
      console.log(data);
      let newEmp = {
        emp_id: data.id,
        emp_name: data.name,
        job_id: data.job,
        date_of_birth: `${data.dateOfBirth}T22:00:00.000Z`,
        encode: data.encode,
      };

      alertSuccess("הנה");
      let newEmpList = [...employees, newEmp];
      setEmployeeList(newEmpList);
    });
  }, []);

  return (
    <Grid container>
      <Grid item xs={8} className={classes.list}>
        <EmployeeList employees={employees} />
      </Grid>
      <Grid item xs={4}>
        <BirthdayCard employees={employees} daysAhead={7} />
      </Grid>
    </Grid>
  );
};

export default Home;
