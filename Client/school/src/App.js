import React, { useEffect, useState } from 'react';
// import './App.css';
import RTL from './RTL';
import { Provider } from 'react-redux';
import store from './store'
import Header from './components/general/Header'
import SignInForm from './components/signInPage/SignInForm'
import SignUpForm from './components/signUpPage/SignUpForm'
import { Route, Switch } from 'react-router';
import SafeRoute from './components/utils/SafeRoute'
import Home from './components/homePage/Home';
import { makeStyles, useTheme } from '@material-ui/core';

// Add proviodr rapper with store prop

let useAppStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background,
    minHeight: "100vh"
  }
}))

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [employees, setEmployees] = useState([]);

  const appClasses = useAppStyles()


  return (
    <Provider store={store}>
      <RTL>
        <div className={appClasses.root}>
          <Header isLoggedIn={isLoggedIn} setLoginStatus={setLoggedIn}/>
          <Switch>
            <Route exact path="/">
              <SignInForm setLogged={setLoggedIn}/>
            </Route>
            <Route exact path="/signup">
              <SignUpForm />
            </Route>
            <SafeRoute exact path="/home" isLoggedIn={isLoggedIn}>
              <Home isLoggedIn={isLoggedIn}/>
            </SafeRoute>
          </Switch>
        </div>
      </RTL>
    </Provider>
  );
}

export default App;
