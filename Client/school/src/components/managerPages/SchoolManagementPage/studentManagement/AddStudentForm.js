import React, { useEffect, useState } from 'react';
import {
    Button, CssBaseline, TextField, Grid, Typography,
    makeStyles, Container, IconButton
} from '@material-ui/core';
import { useForm } from 'react-hook-form'
import { getRules } from './validationRules'
import { addNewStudent } from '../../../../api/studentApi';
import { Close } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    paper: {
        // marginTop: theme.spacing(8),
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
    },
    form: {
        width: '20', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const dateStyles = makeStyles({
    root: {
        marginTop: "0 !important"
    }
})

const AddStudentForm = ({ handleAddDialog }) => {
    const classes = useStyles();
    const { register, handleSubmit, errors, getValues, reset } = useForm()
    const rules = getRules(getValues());

    // Form fields : firstname, lastname, dateofbirth, job, password(and repeat),
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [id, setId] = useState("");
    const [birthYear, setBirthYear] = useState("");

    const handleSignUp = (data) => {
        // e.preventDefault()
        let student = {
            id: data.idNumber,
            name: `${data.firstName} ${data.lastName}`,
            birthYear: data.birthYear,
        }

        addNewStudent(student).then(res => {
            if (res.success) {
                handleAddDialog(false);
            }
            alert(res.message)
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography component="h1" variant="h5">
                            הוספת תלמיד למערכת

                </Typography>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={1}>
                        <IconButton onClick={() => handleAddDialog(false)}>
                            <Close />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <form className={classes.form} noValidate onSubmit={handleSubmit(e => handleSignUp(e))} >
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6}>
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
                                <Grid item xs={6} sm={6}>
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
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="birthYear"
                                        label="שנת לידה"
                                        name="birthYear"
                                        defaultValue={birthYear}
                                        inputRef={register(rules.birthYear)}
                                        error={Boolean(errors.birthYear)}
                                        helperText={Boolean(errors.birthYear) ? errors.birthYear["message"] : ""}
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
                                הוספה
                    </Button>
                        </form>
                    </Grid>
                </Grid>


            </div>
        </Container>
    );
}

export default AddStudentForm;