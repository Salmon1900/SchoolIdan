import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { pageList } from "../../consts/pages";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { logOutUser } from "../../actions/userActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  icon: {
    borderLeft: `5px solid ${theme.palette.primary.main}`,
    borderRadius: 50,
    borderBottom: "inset",
  },
}));

const useIconStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
  },
}));

const NavDrawer = ({ isOpen, closeNavDrawer, role, logOutUser }) => {
  const classes = useStyles();
  const iconClasses = useIconStyles();
  const history = useHistory();

  const moveToPage = (page) => {
    if (page.route === "/") {
      logOutUser();
    }

    closeNavDrawer(false);
    history.push(page.route);
  };

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
            return page.roles.includes(role) ? (
              <ListItem
                button
                key={page.name}
                onClick={(e) => moveToPage(page)}
                className={classes.icon}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItem>
            ) : (
              false
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state.user.role,
  };
};

const mapDispatchToProps = () => (dispatch) => {
  return {
    logOutUser: () => dispatch(logOutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavDrawer);
