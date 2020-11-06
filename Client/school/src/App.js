import React, { useEffect, useState } from "react";
// import './App.css';
import RTL from "./RTL";
import Header from "./components/general/Header";
import SignInForm from "./components/signInPage/SignInForm";
import SignUpForm from "./components/signUpPage/SignUpForm";
import { Route, Switch } from "react-router";
import SafeRoute from "./components/utils/SafeRoute";
import Home from "./components/homePage/Home";
import { makeStyles, useTheme } from "@material-ui/core";
import NavDrawer from "./components/general/NavDrawer";
import SchoolManagementPage from "./components/managerPages/SchoolManagementPage/SchoolManagementPage";
import { roles } from "./roles";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css/animate.compat.css";
import { connect } from "react-redux";
import ClassManagementPage from "./components/teacherPages/classManagementPage/ClassManagementPage";
import StaffManagementPage from "./components/managerPages/StaffManagementPage/StaffManagementPage";
import GradingPage from "./components/teacherPages/gradingPage/GradingPage";
import StudentStatsPage from "./components/teacherPages/studentStatsPage/StudentStatsPage";
import ClassManageInspectionPage from "./components/managerPages/teacherInspection/ClassManageInspectionPage";
import GradingInspectionPage from "./components/managerPages/teacherInspection/GradingInspectionPage";
import StudentStatsInspectionPage from "./components/managerPages/teacherInspection/StudentStatsInspectionPage";
import { socket } from "./api/socket";
import { alertSuccess } from "./consts/reactAlert";

// Add proviodr rapper with store prop

let useAppStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background,
    minHeight: "100vh",
    textAlign: "center",
    // display: "flex",
    // justifyContent: "center",
  },
}));

function App({ isLoggedIn, empId }) {
  const [navDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {}, []);

  const appClasses = useAppStyles();

  return (
    <RTL>
      <ReactNotification />
      <div className={appClasses.root}>
        <Header openNavDrawer={setDrawerOpen} />
        <Switch>
          <Route exact path="/">
            <SignInForm />
          </Route>
          <Route exact path="/signup">
            <SignUpForm />
          </Route>
          <SafeRoute exact path="/home">
            <Home />
          </SafeRoute>
          <SafeRoute exact path="/schoolManagement">
            <SchoolManagementPage />
          </SafeRoute>
          <SafeRoute exact path="/teacherManagment">
            <StaffManagementPage />
          </SafeRoute>
          <SafeRoute exact path="/classManagement">
            <ClassManagementPage teacherId={empId} />
          </SafeRoute>
          <SafeRoute exact path="/grading">
            <GradingPage teacherId={empId} />
          </SafeRoute>
          <SafeRoute exact path="/stats">
            <StudentStatsPage teacherId={empId} />
          </SafeRoute>
          <SafeRoute exact path="/ins/classManagement">
            <ClassManageInspectionPage />
          </SafeRoute>
          <SafeRoute exact path="/ins/grading">
            <GradingInspectionPage />
          </SafeRoute>
          <SafeRoute exact path="/ins/stats">
            <StudentStatsInspectionPage />
          </SafeRoute>
        </Switch>
        {isLoggedIn ? (
          <NavDrawer isOpen={navDrawerOpen} closeNavDrawer={setDrawerOpen} />
        ) : (
          false
        )}
      </div>
    </RTL>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.loggedIn,
    empId: state.user.id,
  };
};

export default connect(mapStateToProps, null)(App);
