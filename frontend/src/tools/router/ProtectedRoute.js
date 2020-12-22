import React, { useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import UserContext from '../react/UserContext';


function ProtectedRoute({children, ...rest}) {

    const history = useHistory();
    const currentUser = useContext(UserContext);


    if (currentUser.isAuth) { 
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