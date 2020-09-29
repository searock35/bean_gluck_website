import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import auth from '../api/authAPI';


function ProtectedRoute({children, ...rest}) {

    const history = useHistory();


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