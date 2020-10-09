import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { pageList } from "./drawerPages/pages";
import { useHistory } from 'react-router';
import { logOut } from '../../api/loginApi';
import { connect } from 'react-redux';
import { logOutUser } from '../../actions/userActions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}));

const NavDrawer = ({isOpen, closeNavDrawer, role, logOutUser}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory()

  const moveToPage = (page) => {
      if(page.route === "/"){
          logOutUser()
      }

      closeNavDrawer(false);
      history.push(page.route)
  }

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => closeNavDrawer(false)}>
          <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
            {pageList.map((page, index) => {
                return page.roles.includes(role) ? 
                <ListItem button key={page.name} onClick={(e) => moveToPage(page)}>
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText primary={page.name}/>
                </ListItem> : false
            })}
        </List>
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      role: state.user.role
  }
}

const mapDispatchToProps = () => dispatch => {
  return {
    logOutUser: () => dispatch(logOutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavDrawer);
