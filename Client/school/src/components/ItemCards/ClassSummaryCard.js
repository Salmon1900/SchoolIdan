import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { getSubject } from "../../api/subjectApi";
import { getClassStudentCount } from "../../api/classApi";

const useStyles = makeStyles({
  root: {
    // backgroundColor: isActive ? "white" : "grey",
    textAlign: "center",
    // width: "20vw",
    margin: "3vw",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  actions: {
    display: "flex",
    justifyContent: "center",
  },
});

const ClassSummaryCard = ({ classObj, openClass, isSelected }) => {
  const [name, setName] = useState(classObj.class_name);
  const [subject, setSubject] = useState("");
  const [numberOfStudents, setStudentNumber] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    getSubject(classObj.subject_id).then((res) => {
      setSubject(res.subject_name);
    });
    getClassStudentCount(classObj.class_id).then((res) =>
      setStudentNumber(res.count)
    );
  }, [classObj.class_name, isSelected]);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        ></Typography>
        <Typography variant="h4" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {subject}
        </Typography>
        <Typography variant="h6" component="p">
          {`תלמידים ${numberOfStudents}`}
        </Typography>
        <Typography variant="h6" component="p">
          {`שנתון: ${classObj.student_birth_year}`}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        {classObj.isactive ? (
          <Button
            size="medium"
            variant="outlined"
            color="primary"
            onClick={() => openClass(classObj.class_id)}
          >
            פרטי כיתה
          </Button>
        ) : (
          "הכיתה אינה פעילה"
        )}
      </CardActions>
    </Card>
  );
};

export default ClassSummaryCard;
