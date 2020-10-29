import React from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Icon,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Cake } from "@material-ui/icons";

const useStyles = makeStyles({
  card: {
    margin: 60,
  },
});

const BirthdayCard = ({ employees, daysAhead }) => {
  const classes = useStyles();
  const checkIfBirthdayNear = (dateOfBirthStr) => {
    let timePeriodAheadInMilli = daysAhead * 24 * 60 * 60 * 1000;
    let dateOfBirth = new Date(dateOfBirthStr);
    let today = new Date();
    let birthday = new Date(dateOfBirth.getTime());
    birthday.setFullYear(today.getFullYear());
    // If birthday before than current date try next year
    if (birthday < today) {
      birthday.setFullYear(today.getFullYear() + 1);
    }

    if (birthday - today < timePeriodAheadInMilli) {
      return true;
    } else {
      return false;
    }
  };

  const formatBirthday = (dateStr) => {
    let formatted = `${dateStr.slice(8, 10)}/${dateStr.slice(
      5,
      7
    )}/${dateStr.slice(0, 4)}`;

    return formatted;
  };
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h5" variant="h5">
          ימי הולדת קרובים
          <Icon>
            <Cake fontSize="large" />
          </Icon>
        </Typography>
        <List>
          {employees
            .filter((emp) => checkIfBirthdayNear(emp.date_of_birth))
            .map((emp) => (
              <ListItem key={emp.emp_id}>
                <ListItemText
                  primary={emp.emp_name}
                  secondary={formatBirthday(emp.date_of_birth)}
                />
              </ListItem>
            ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default BirthdayCard;
