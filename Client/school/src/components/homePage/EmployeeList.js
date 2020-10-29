import React from "react";
import EmployeeProfileCard from "./EmployeeProfileCard";
import { Typography } from "@material-ui/core";

const EmployeeList = ({ employees }) => {
  const renderEmployeeCards = (employeeList) => {
    if (!employeeList) {
      return <div>אין</div>;
    }
    return employeeList.map((emp) => (
      <EmployeeProfileCard key={emp.emp_id} employee={emp} />
    ));
  };

  return (
    <div>
      <Typography component="h4" variant="h4">
        העובדים שלנו:
      </Typography>
      {renderEmployeeCards(employees)}
    </div>
  );
};

export default EmployeeList;
