import React from "react";
import { Dialog, Grid, IconButton, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useDiglogStyles = makeStyles({
  root: {
    maxWidth: "none !important",
  },
  paperWidthFalse: {
    width: "40vw",
  },
});

const EntityDialog = ({ isOpen, closeHandler, children }) => {
  const dialogClasses = useDiglogStyles();
  return (
    <Dialog
      open={isOpen}
      dir="rtl"
      onClose={() => closeHandler()}
      maxWidth={false}
      classes={dialogClasses}
    >
      <Grid container justify="flex-end">
        <Grid item xs={1}>
          <IconButton onClick={() => closeHandler()}>
            <Close />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default EntityDialog;
