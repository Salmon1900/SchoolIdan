import React, { useEffect, useState } from 'react';
import {
    Button, CssBaseline, TextField, Grid, Typography,
    makeStyles, Container, IconButton, Select
} from '@material-ui/core';
import { useForm } from 'react-hook-form'
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


const SchoolManageForm = ({ fields, title, buttonLabel, handleAction, handleFormDialog, actionAttribute  }) => {
    const classes = useStyles();
    const { register, handleSubmit, errors, getValues, reset } = useForm()

    const handleComplete = async (data) => {
        let success = await handleAction(actionAttribute ? data[actionAttribute] : data);
        handleFormDialog(!success)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography component="h1" variant="h5">
                            {title}

                </Typography>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={1}>
                        <IconButton onClick={() => handleFormDialog(false)}>
                            <Close />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <form className={classes.form} noValidate onSubmit={handleSubmit(e => handleComplete(e))} >
                            <Grid container spacing={2}>
                                {fields.map((field) => {
                                    return(
                                        <Grid item xs={field.width} key={field.id}>
                                            {field.type === 'select' ? 
                                            <Select></Select>:

                                            <TextField
                                            name={field.name}
                                            variant="outlined"
                                            required={field.required}
                                            fullWidth={field.fullWidth}
                                            defaultValue={field.defaultValue}
                                            id={field.id}
                                            label={field.label}
                                            autoFocus
                                            inputRef={register(field.rules)}
                                            error={Boolean(errors[field.name])}
                                            helperText={Boolean(errors[field.name]) ? errors[field.name]["message"] : ""}/>}
                                        </Grid>
                                    )
                                })}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            // onClick={checkForErrors}
                            >
                                {buttonLabel}
                    </Button>
                        </form>
                    </Grid>
                </Grid>


            </div>
        </Container>
    );
}

export default SchoolManageForm;