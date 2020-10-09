import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import StudentManagementSection from './Sections/StudentManagementSection';
import SubjectManagementSection from './Sections/SubjectManagementSection';
 
const SchoolManagementPage = () => {

    return(
        <div>
            <StudentManagementSection/>
            <SubjectManagementSection/>
        </div>
    )

}

export default SchoolManagementPage;