import React, { useState } from "react";
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  select: {
    width: "50%",
  },
});

const ClassSelector = ({
  selectedClassId,
  setSelectedClass,
  classList = [],
}) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" fullWidth className={classes.select}>
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
