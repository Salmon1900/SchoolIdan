import React, { useEffect, useState } from 'react';
import {
    Avatar, Button, CssBaseline, TextField, Link, Grid, Typography,
    makeStyles, Container, Select, MenuItem, InputLabel, FormControl
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { useForm } from 'react-hook-form'
import { getJobList } from '../../api/jobApi';
import { addNewEmployee } from '../../api/employeeApi';
import { getRules } from './validationRules'
import { da } from 'date-fns/locale';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '35vw', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const dateStyles = makeStyles({
    root: {
        marginTop: "0 !important"
    }
})

let jobList = [];




const SignUpForm = () => {
    const classes = useStyles();
    const dateClasses = dateStyles();
    const { register, handleSubmit, errors, getValues, reset } = useForm()
    const rules = getRules(getValues());

    // Form fields : firstname, lastname, dateofbirth, job, password(and repeat),
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [jobId, setJobId] = useState(2);
    const [jobList, setJobList] = useState([]);
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    let history = useHistory()

    useEffect(() => {
        getJobList().then(jobs => setJobList(jobs))
    }, [])

    const handleDateChange = (date) => {
        setdateOfBirth(date);
    };

    const handleJobChange = (job) => {
        setJobId(job.target.value);
    }

    const handleSignUp = (data) => {
        // e.preventDefault()
        let newEmp = {
            id: data.idNumber,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            jobId: jobId,
            password: data.password
        }

        addNewEmployee(newEmp).then(res => {
            if(res.success){
                reset()
                history.push('/')
            }
            alert(res.message)
        })
    }

    const renderJobList = () => {

        if(jobList){
            return jobList.map(job => {
                return <MenuItem key={job.job_id} value={job.job_id}>{job.job_title}</MenuItem>
            })
        } else {
            return(<div>ריק</div>)
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    הרשמה
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(e => handleSignUp(e))}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                defaultValue={firstName}
                                id="firstName"
                                label="שם פרטי"
                                autoFocus
                                inputRef={register(rules.firstName)}
                                error={Boolean(errors.firstName)}
                                helperText={Boolean(errors.firstName) ? errors.firstName["message"] : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="שם משפחה"
                                name="lastName"
                                defaultValue={lastName}
                                inputRef={register(rules.lastName)}
                                error={Boolean(errors.lastName)}
                                helperText={Boolean(errors.lastName) ? errors.lastName["message"] : ""}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className={dateClasses.root}
                                    variant="outlined"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    label="תאריך לידה"
                                    // defaultValue={dateOfBirth}
                                    value={dateOfBirth}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    inputRef={register(rules.dateOfBirth)}
                                    error={Boolean(errors.dateOfBirth)}
                                    helperText={Boolean(errors.dateOfBirth) ? errors.dateOfBirth["message"] : ""}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="job-select-label">תפקיד</InputLabel>
                                <Select
                                    fullWidth
                                    id="job-select"
                                    value={jobId}
                                    onChange={handleJobChange}
                                    name="jobSelect"
                                    label="תפקיד"
                                >
                                    {renderJobList()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="idNumber"
                                label="מספר תעודת זהות"
                                name="idNumber"
                                defaultValue={id}
                                inputRef={register(rules.id)}
                                error={Boolean(errors.idNumber)}
                                helperText={Boolean(errors.idNumber) ? errors.idNumber["message"] : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="סיסמה"
                                type="password"
                                id="password"
                                defaultValue={password}
                                inputRef={register(rules.password)}
                                error={Boolean(errors.password)}
                                helperText={Boolean(errors.password) ? errors.password["message"] : ""}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="repeatPassword"
                                label="הזן סיסמה חוזרת"
                                type="password"
                                id="repeatPassword"
                                defaultValue={repeatPassword}
                                inputRef={register({ ...rules.repeat, validate: (value) => value===getValues('password') || 'הסיסמאות לא תואמות'})}
                                error={Boolean(errors.repeatPassword)}
                                helperText={Boolean(errors.repeatPassword) ? errors.repeatPassword["message"] : ""}
                                
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        // onClick={checkForErrors}
                    >
                        הרשמה
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                יש לך חשבון? היכנס
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignUpForm;