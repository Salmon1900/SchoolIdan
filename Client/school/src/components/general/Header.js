import { Grid, makeStyles, IconButton } from '@material-ui/core';
import React from 'react';
import Logo from '../../res/placeholder.png'
import { getAllSubjects } from '../../api/subjectApi'
import { ExitToApp } from '@material-ui/icons';
// import { IconButton } from 'material-ui';

const headerStyles = makeStyles(theme => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        height: "8vh",
        padding: 15
    },
    logo: {
        height: "6vh",
    }
}));
const Header = ({ isLoggedIn, setLoginStatus }) => {
    const headerClasses = headerStyles();
    return (
        <header className={headerClasses.header}>
            <Grid container>
                <Grid item xs={2}>
                    {isLoggedIn ? <IconButton onClick={() => setLoginStatus(false)}>
                        <ExitToApp fontSize="large" />
                    </IconButton> : false}
                </Grid>
                <Grid item xs={8}>
                </Grid>
                <Grid item xs={2}>
                    <img src={Logo} className={headerClasses.logo} />
                </Grid>
            </Grid>
        </header>
    )
}

export default Header;