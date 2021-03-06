import React, { useEffect, useState } from "react";
import {
  TextField,
  Avatar,
  Button,
  CssBaseline,
  Link,
  Grid,
  Typography,
  makeStyles,
  Container,
  useTheme,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { tryLogIn } from "../../api/loginApi";
import { Redirect, useHistory } from "react-router";
import { connect } from "react-redux";
import { logInUser } from "../../actions/userActions";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { store } from "react-notifications-component";
import { alertError, alertSuccess } from "../../consts/reactAlert";
import { socket } from "../../api/socket";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    // direction: "rtl"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInForm = ({ setLoggedIn, isLoggedIn, role }) => {
  const classes = useStyles();
  let [idNumber, setIdNumber] = useState("");
  let [password, setPassword] = useState("");
  let [isIdValid, setIdValidStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const theme = useTheme();

  useEffect(() => {
    socket.on("signIn", ({ id, name }) => {
      alertSuccess(`${name} התחבר`);
    });
  }, []);

  const validateId = (id) => {
    setIdValidStatus(id.length === 9);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    validateId(idNumber);
    setLoggedIn(idNumber, password);
    setLoading(true);
    tryLogIn(idNumber, password, false).then((res) => handleLoginAttempt(res));
  };

  const handleLoginAttempt = async (result) => {
    if (!result) {
      // Clear fields
      setIdNumber("");
      setPassword("");
      alertError("שם משתמש או סיסמה לא נכונים");
      setLoading(false);
    } else {
      history.push("/home");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          התחבר
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            dir="rtl"
            id="idNumber"
            label="מס' תעודת זהות"
            name="idNumber"
            autoFocus
            error={!isIdValid}
            helperText={isIdValid ? null : "יש להזין מספר שאורכו 9 ספרות"}
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            התחבר
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"הרשמה"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Loader
        type="Watch"
        color={theme.palette.primary.main}
        height={60}
        width={60}
        visible={loading}
      />
    </Container>
  );
};

const mapDispatchToProps = () => (dispatch) => {
  return {
    setLoggedIn: async (id, password) => dispatch(logInUser(id, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.loggedIn,
    role: state.useRole,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
