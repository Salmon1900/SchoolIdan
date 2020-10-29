import React from "react";
import MaterialTable from "material-table";
import { gradeTableData } from "../../../../consts/gradingData";
import tableIcons from "../../../../consts/tableIcons";

const GradeTable = ({ grades, isAvg = false }) => {
  return (
    <MaterialTable
      icons={tableIcons}
      columns={isAvg ? gradeTableData.avgColumns : gradeTableData.columns}
      data={grades}
      options={{
        search: false,
      }}
    />
  );
};

export default GradeTable;
