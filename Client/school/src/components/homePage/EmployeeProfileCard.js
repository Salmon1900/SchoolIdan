import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Profile from "../../res/ProfilePlaceholder.png";

import React, { useEffect, useState } from "react";
import { getEmployeeQualifications } from "../../api/employeeApi";
import { roles } from "../../roles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "60vw",
    margin: 20,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const EmployeeProfileCard = ({ employee, qualifications }) => {
  const classes = useStyles();
  const [subjectsEmpCanTeach, setCanTeach] = useState(["אין"]);

  useEffect(() => {
    getEmployeeQualifications(employee.emp_id).then((res) => {
      setCanTeach(res);
    });
  }, []);

  return (
    <Card className={classes.root}>
      {!employee.encode ? (
        <CardMedia
          className={classes.cover}
          image={Profile}
          title="תמונת פרופיל"
        />
      ) : (
        <img
          src={`data:image/jpg;base64,${employee.encode}`}
          width="151px"
          height="121px"
        />
      )}
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {employee.emp_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {employee.emp_id}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {employee.job_id == roles.PRINCIPAL
              ? "מנהל"
              : subjectsEmpCanTeach.length
              ? `הסמכות: ${subjectsEmpCanTeach
                  .map((q) => q.subject_name)
                  .join(",")}`
              : "חסר הסמכה"}
          </Typography>
        </CardContent>
        <div className={classes.controls}></div>
      </div>
    </Card>
  );
};

export default EmployeeProfileCard;
