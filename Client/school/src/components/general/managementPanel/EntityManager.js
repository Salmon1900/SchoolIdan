import React, { useState, useEffect } from "react";
import { Grid, Divider, Button, makeStyles } from "@material-ui/core";
import FormDialog from "./FormDialog";
import SchoolManageForm from "./SchoolManageForm";

const useStyles = makeStyles((theme) => ({
  manager: {
    padding: 30,
  },
  buttonContainer: {
    height: "100%",
  },
  divider: {
    height: "95%",
    width: "4px",
    marginRight: "46px",
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    width: "5vw",
  },
}));

const EntityManager = ({
  entityId,
  EntityCard,
  actions = {},
  actionMap,
  reloadEntityData = () => {},
}) => {
  let [actionDialogs, setDigalogState] = useState(actionMap);
  const classes = useStyles();

  useEffect(() => {
    reloadEntityData();
  }, [actionDialogs]);

  // const initActionDialogs = async () => {
  //   let dialogState = {};
  //   await Object.keys(actions).forEach((actionName) => {
  //     dialogState[actionName] = false;
  //   });

  //   setDigalogState(dialogState);
  // };

  const openDialog = async (action) => {
    let newDialogState = { ...actionDialogs };
    await Object.keys(actionDialogs).forEach(
      (actionDialog) => (newDialogState[actionDialog] = false)
    );
    newDialogState[action] = true;
    setDigalogState(newDialogState);
  };

  const closeDialog = async (action) => {
    let newDialogState = { ...actionDialogs };
    newDialogState[action] = false;
    setDigalogState(newDialogState);
  };
  return (
    <Grid container className={classes.manager}>
      <Grid item xs={8}>
        {EntityCard}
      </Grid>
      <Grid item xs={1}>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={3}>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="stretch"
          className={classes.buttonContainer}
        >
          {Object.keys(actions).map((actionName) => {
            return actions[actionName] ? (
              <Grid item xs={2} key={actionName}>
                <Button
                  onClick={() => openDialog(actionName)}
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  {actions[actionName].label}
                </Button>
              </Grid>
            ) : (
              false
            );
          })}
        </Grid>
      </Grid>
      {Object.keys(actions).map((actionName) => {
        let action = actions[actionName];
        return action ? (
          <FormDialog
            key={actionName}
            name={action.name}
            isOpen={actionDialogs[action.name]}
            closeHandler={closeDialog}
          >
            <SchoolManageForm
              handleFormDialog={(dialogStat) =>
                dialogStat ? openDialog(action.name) : closeDialog(action.name)
              }
              handleAction={action.actionFunc}
              {...action.form}
              dropdownData={action.dropdown}
            />
          </FormDialog>
        ) : (
          false
        );
      })}
    </Grid>
  );
};

export default EntityManager;
