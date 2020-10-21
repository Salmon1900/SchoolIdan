import React from "react";
import { Dialog, IconButton, Grid } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const FormDialog = ({ closeHandler, name, isOpen, children }) => {
  return (
    <Dialog
      open={isOpen}
      fullWidth
      dir="rtl"
      onClose={() => closeHandler(name)}
    >
      <Grid container justify="flex-end">
        <Grid item xs={1}>
          <IconButton onClick={() => closeHandler(name)}>
            <Close />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Dialog>
  );
};

export default FormDialog;
