import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  List,
} from "@material-ui/core";
import { Face, AssignmentReturn } from "@material-ui/icons";

const StudentGradingList = ({ studentList, handleGrading }) => {
  return (
    <List>
      {studentList.map((student) => (
        <ListItem key={student.student_id}>
          <ListItemAvatar>
            <Avatar>
              <Face />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={student.student_name} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="grade"
              onClick={() => handleGrading(student.student_id)}
            >
              <AssignmentReturn />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default StudentGradingList;
