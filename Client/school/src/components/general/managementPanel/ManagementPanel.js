import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ManagementTable from "./ManagementTable";
import SchoolManageForm from "./SchoolManageForm";
import FormDialog from "./FormDialog";

const useManagePanelStyles = makeStyles({
  panel: {
    padding: 25,
    boxShadow: "-5px 7px 20px 7px black",
  },
});
const useButtonPanelStyles = makeStyles({
  panel: {
    paddingTop: 20,
  },
  button: {
    fontSize: 18,
    width: "20vh",
  },
});

const ManagementPanel = ({
  title,
  data,
  reloadData,
  tableData,
  actions,
  actionMap,
}) => {
  let [actionDialogs, setActionDialogs] = useState(actionMap);
  const mainPanelClasses = useManagePanelStyles();
  const buttonPanelClasses = useButtonPanelStyles();

  useEffect(() => {
    reloadData();
  }, [actionDialogs]);

  const openDialog = async (action) => {
    let newDialogState = { ...actionDialogs };
    await Object.keys(actionDialogs).forEach(
      (actionDialog) => (newDialogState[actionDialog] = false)
    );
    newDialogState[action] = true;
    setActionDialogs(newDialogState);
  };

  const closeDialog = async (action) => {
    let newDialogState = { ...actionDialogs };
    newDialogState[action] = false;
    setActionDialogs(newDialogState);
  };
  return (
    <div className={mainPanelClasses.panel}>
      <Grid container justify="center">
        <Grid item xs={2}>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={8}>
          <ManagementTable
            data={data}
            openDialog={openDialog}
            closeDialog={closeDialog}
            actions={actions}
            {...tableData}
          />
        </Grid>
        <Grid item xs={8} className={buttonPanelClasses.panel}>
          <Grid container justify="space-around">
            {Object.keys(actions).map((actionName) => {
              return actionName === "dialogMap" ? (
                false
              ) : (
                <Grid item xs={2} key={actionName}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={buttonPanelClasses.button}
                    onClick={() => openDialog(actionName)}
                  >
                    {actions[actionName].label}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      {Object.keys(actions).map((actionName) => {
        let action = actions[actionName];
        return actionName === "dialogMap" ? (
          false
        ) : (
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
        );
      })}
    </div>
  );
};

export default ManagementPanel;
