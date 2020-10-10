import { Button, Dialog, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ManagementTable from './ManagementTable';
import SchoolManageForm from './SchoolManageForm';

const useButtonPanelStyles = makeStyles({
    panel: {
        paddingTop: 10
    },
    button: {
        fontSize: 18,
        width: "20vh"
    }
})

const ManagementPanel = ({title, data, reloadData, tableData, addItem, addButtonLabel, addFormData, removeItem, removeButtonLabel, removeFormData}) => {
    const buttonPanelClasses = useButtonPanelStyles()
    const [addDialog, setAddDialog] = useState(false);
    const [removeDialog, setRemoveDialog] = useState(false);

    useEffect(() => {
        reloadData()
    }, [addDialog, removeDialog])

    return (
        <div>
            <Grid container justify="center">
                <Grid item xs={2}>
                    <Typography variant="h3">
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={8}>
                    <ManagementTable data={data} removeItem={removeItem} handleAddDialog={setAddDialog} {...tableData}/>
                </Grid>
                <Grid item xs={8} className={buttonPanelClasses.panel}>
                    <Grid container justify="space-around">
                        {addFormData ? <Grid item xs={2}>
                            <Button variant="contained" color="primary" className={buttonPanelClasses.button} onClick={() => setAddDialog(true)}>{addButtonLabel}</Button>
                        </Grid> : false}
                        {removeFormData ? <Grid item xs={2}>
                            <Button variant="contained" color="primary" className={buttonPanelClasses.button} onClick={() => setRemoveDialog(true)}>{removeButtonLabel}</Button>
                        </Grid> : false}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={addDialog} fullWidth dir="rtl" onClose={() => setAddDialog(false)}>
                {addFormData ? <SchoolManageForm handleFormDialog={setAddDialog}  handleAction={addItem} {...addFormData}/>: "אין אפשרות להוסיף מפריט זה"}
            </Dialog>
            <Dialog open={removeDialog} fullWidth dir="rtl" onClose={() => setRemoveDialog(false)}>
                {removeFormData ? <SchoolManageForm handleFormDialog={setRemoveDialog} handleAction={removeItem} {...removeFormData}/> : "אין אפשרות למחוק מפריט זה"}
            </Dialog>
        </div>
    )
}

export default ManagementPanel;