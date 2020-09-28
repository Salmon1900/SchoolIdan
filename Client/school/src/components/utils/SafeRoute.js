import React from 'react';
import { Redirect, Route } from 'react-router';

const SafeRoute = ({path, isLoggedIn, ...rest}) => {
    console.log(rest)

    return(
        <Route path={path} exact>
            {isLoggedIn ? 
            rest.children
            : <Redirect to="/"/>}

        </Route>
    );
}

export default SafeRoute;