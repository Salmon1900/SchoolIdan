import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const SafeRoute = ({path, isLoggedIn, ...rest}) => {
    return(
        <Route path={path} exact>
            {isLoggedIn  ? 
            rest.children
            : <Redirect to="/"/>}

        </Route>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.loggedIn
    }
}

export default connect(mapStateToProps, null)(SafeRoute);