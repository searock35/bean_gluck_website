import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import auth from '../api/auth';


function ProtectedRoute({children, ...rest}) {

    const history = useHistory();

    console.log(auth.isAuth());

    return (
        <Route 
            {...rest} 
            render={({ location }) => 
                auth.isAuth() ? (children) : (<Redirect to="/login" />)
            }>
        </Route>
    )
}

export default ProtectedRoute;