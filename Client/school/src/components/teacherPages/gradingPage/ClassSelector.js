import React from "react";
import { Select, FormControl, MenuItem, InputLabel } from "@material-ui/core";

const ClassSelector = ({
  selectedClassId,
  setSelectedClass,
  classList = [],
}) => {
  return (
    <FormControl
      variant="outlined"
      fullWidth
      // className={classes.formControl}
    >
      <InputLabel id="class-select-label">בחר כיתה</InputLabel>
      <Select
        id="class-select"
        value={selectedClassId}
        onChange={(e) => setSelectedClass(e.target.value)}
        name="classSelect"
        label="בחר כיתה"
      >
        {classList.map((classObj) => (
          <MenuItem key={classObj.class_id} value={classObj.class_id}>
            {classObj.class_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ClassSelector;
