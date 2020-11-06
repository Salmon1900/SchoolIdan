import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSchoolYear } from '../../actions/managementActions'

const SchoolYearSelector = () => {
    const selectedYear = useSelector(state => state.management.selectedSchoolYear);
    const dispatch = useDispatch();
    
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
        views={["year"]}
        label="שנת לימודים"
        value={selectedYear}
        onChange={(e) => dispatch(changeSchoolYear(String(e.getFullYear())))}
        variant="outlined"
        margin="normal"
        />
        </MuiPickersUtilsProvider>
    )
}

export default SchoolYearSelector;