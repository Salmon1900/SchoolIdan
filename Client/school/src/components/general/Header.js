import { Grid, makeStyles, IconButton } from '@material-ui/core';
import React from 'react';
import Logo from '../../res/lion-logo-1.png'
import HatLogo from '../../res/hat-icon.png'
import { getAllSubjects } from '../../api/subjectApi'
import { ExitToApp, Menu } from '@material-ui/icons';
import { connect } from 'react-redux';
// import { IconButton } from 'material-ui';

const headerStyles = makeStyles(theme => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        height: "7vh",
        padding: 5
    },
    logo: {
        height: "6vh",
    }
}));
const Header = ({ isLoggedIn, openNavDrawer }) => {
    const headerClasses = headerStyles();
    return (
        <header className={headerClasses.header}>
            <Grid container>
                <Grid item xs={1}>
                    {isLoggedIn ?
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={() => openNavDrawer(true)}
                        // className={clsx(open && classes.hide)}
                        >
                            <Menu />
                        </IconButton> : false}
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={1}>
                    <img src={HatLogo} className={headerClasses.logo} />
                    {/* <img src={Logo} className={headerClasses.logo} /> */}
                </Grid>
            </Grid>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.loggedIn
    }
}

export default connect(mapStateToProps, null)(Header);