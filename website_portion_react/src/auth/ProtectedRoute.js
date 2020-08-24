import React from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import auth from './auth';


function ProtectedRoute({children, ...rest}) {

    const history = useHistory();

    let match = useRouteMatch();

    console.log(match.params.username);

    return (
        <Route 
            {...rest} 
            render={({ location }) => 
                auth.isAuth() ? (children) : (history.push("/login"))
            }>
        </Route>
    )
}

export default ProtectedRoute;