import React, { useState } from 'react';
import {
    Button, CssBaseline, TextField, Grid, Typography,
    makeStyles, Container, IconButton
} from '@material-ui/core';
import { useForm } from 'react-hook-form'
import { getRules } from './validationRules'
import { Close } from '@material-ui/icons';


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

const DeleteStudentForm = ({ handleDeleteDialog, removeStudent }) => {
    const classes = useStyles();
    const { register, handleSubmit, errors, getValues, reset } = useForm()
    const rules = getRules(getValues());

    // Form fields : firstname, lastname, dateofbirth, job, password(and repeat),
    const [id, setId] = useState("");

    const handleDelete = (data) => {
        // e.preventDefault()
        let id = data.idNumber;

        removeStudent(id);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Grid container>
                    <Grid item xs={11}>
                        <Typography component="h1" variant="h5">
                            מחיקת תלמיד
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton onClick={() => handleDeleteDialog(false)}>
                            <Close />
                        </IconButton>
                    </Grid>
                </Grid>
                <form className={classes.form} noValidate onSubmit={handleSubmit(e => handleDelete(e))} >
                    <Grid container spacing={2}>
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    // onClick={checkForErrors}
                    >
                        מחיקת תלמיד
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default DeleteStudentForm;