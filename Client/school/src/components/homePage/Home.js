import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../../api/employeeApi";
import EmployeeList from "./EmployeeList";
import BirthdayCard from "./BirthdayCard";

const Home = () => {
  const [employees, setEmployeeList] = useState([]);

  useEffect(() => {
    getAllEmployees().then((res) => {
      setEmployeeList(res);
    });
  }, []);

  return (
    <Grid container>
      <Grid item xs={8}>
        <EmployeeList employees={employees} />
      </Grid>
      <Grid item xs={4}>
        <BirthdayCard employees={employees} daysAhead={7} />
      </Grid>
    </Grid>
  );
};

export default Home;
