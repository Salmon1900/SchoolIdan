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
    <Grid>
      <EmployeeList employees={employees} />
    </Grid>
  );
};

export default Home;
