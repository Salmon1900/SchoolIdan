import React, { useEffect, useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  form: {
    width: "20", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fileInputLabel: {
    border: "1px solid #c4c4c4",
    borderRadius: "5px",
    padding: "21px",
  },
  dateField: {
    marginTop: "0 !important",
  },
}));

const SchoolManageForm = ({
  fields,
  title,
  dropdownData = {},
  buttonLabel,
  handleAction,
  handleFormDialog,
  actionAttribute,
  keyData,
}) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, getValues, reset } = useForm();
  const [selectedData, setSelected] = useState({});
  const [dateValues, setDateValues] = useState({});
  const [formFile, setFormFile] = useState({});

  useEffect(() => {
    // resetSelectedValues();
  }, []);

  // const resetSelectedValues = async () => {
  //   let selected = {};
  //   await Object.keys(dropdownData).forEach((selectField) => {
  //     selected[selectField] = dropdownData[selectField][0].subject_id;
  //   });

  //   return selected;
  // };

  const setSelectedValue = (value, selectFieldName) => {
    let newSelected = { ...selectedData };
    newSelected[selectFieldName] = value;
    setSelected(newSelected);
  };

  const handleDateChange = (date, fieldId) => {
    let newDateVals = { ...dateValues };
    newDateVals[fieldId] = date;
    setDateValues(newDateVals);
  };

  const handleComplete = async (fieldData) => {
    let success = await handleAction(
      actionAttribute ? fieldData[actionAttribute] : fieldData,
      selectedData,
      formFile,
      keyData
    );
    handleFormDialog(!success);
  };
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
          <Grid item xs={12}>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit((e) => handleComplete(e))}
            >
              <Grid container spacing={2}>
                {fields.map((field) => {
                  return (
                    <Grid item xs={field.width} key={field.id}>
                      {field.type === "select" ? (
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>{field.label}</InputLabel>
                          <Select
                            id={field.id}
                            name={field.name}
                            label={field.label}
                            fullWidth={field.fullWidth}
                            required={field.required}
                            value={
                              selectedData[field.dropdown.name]
                                ? selectedData[field.dropdown.name]
                                : ""
                            }
                            onChange={(e) =>
                              setSelectedValue(
                                e.target.value,
                                field.dropdown.name
                              )
                            }
                          >
                            {/* <MenuItem value="">לא נבחר</MenuItem> */}
                            {dropdownData[field.dropdown.name].map((option) => {
                              return (
                                <MenuItem
                                  key={option[field.dropdown.idAttr]}
                                  value={option[field.dropdown.idAttr]}
                                >
                                  {option[field.dropdown.displayAttr]}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      ) : field.type === "date" ? (
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            className={classes.dateField}
                            variant="outlined"
                            format="MM/dd/yyyy"
                            margin="normal"
                            name={field.name}
                            id={field.id}
                            label={field.label}
                            // defaultValue={dateOfBirth}
                            value={
                              dateValues[field.id] ? dateValues[field.id] : null
                            }
                            onChange={(date) =>
                              handleDateChange(date, field.id)
                            }
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                            inputRef={register(field.rules)}
                            error={Boolean(errors[field.name])}
                            helperText={
                              Boolean(errors[field.name])
                                ? errors[field.name]["message"]
                                : ""
                            }
                          />
                        </MuiPickersUtilsProvider>
                      ) : field.type === "file" ? (
                        <InputLabel className={classes.fileInputLabel}>
                          {Object.keys(formFile).length
                            ? formFile[0]["name"]
                            : `${field.label} לחץ להוספת`}
                          <OutlinedInput
                            type="file"
                            name={field.name}
                            lang="heb"
                            style={{ display: "none" }}
                            // value={profilePicture}
                            onChange={(e) => setFormFile(e.currentTarget.files)}
                          />
                        </InputLabel>
                      ) : field.type === "autocomplete" ? (
                        <Autocomplete
                          id={field.id}
                          options={dropdownData[field.dropdown.name]}
                          getOptionLabel={(option) =>
                            option[field.dropdown.displayAttr]
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name={field.name}
                              variant="outlined"
                              required={field.required}
                              fullWidth={field.fullWidth}
                              defaultValue={field.defaultValue}
                              label={field.label}
                              autoFocus
                              inputRef={register(field.rules)}
                              error={Boolean(errors[field.name])}
                              helperText={
                                Boolean(errors[field.name])
                                  ? errors[field.name]["message"]
                                  : ""
                              }
                            />
                          )}
                        />
                      ) : (
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
                          helperText={
                            Boolean(errors[field.name])
                              ? errors[field.name]["message"]
                              : ""
                          }
                        />
                      )}
                    </Grid>
                  );
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
};

export default SchoolManageForm;
