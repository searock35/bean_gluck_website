import React from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import auth from './authAPI';


function ProtectedRoute({children, ...rest}) {

    const history = useHistory();

    let match = useRouteMatch();

    console.log(match.params.username);

    if(auth.isAuth) { 
        return (
            <Route 
                {...rest} 
                render={() => 
                   (children)
                }>
            </Route>
        )
    } else {
        return (
            <Route
                {...rest}
                render={() => history.push("/login")}
            />
        )
    }
}

export default ProtectedRoute;