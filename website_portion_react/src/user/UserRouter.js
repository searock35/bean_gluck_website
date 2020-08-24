import React, { useContext } from 'react';
//Tools
import { Switch, Redirect, useRouteMatch, useParams } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import UserContext from './UserContext';
//Components
import UserListings from './UserListings';
import Dashboard from './Dashboard';
import EditUserProfile from'./EditUserProfile';
import Unauthorized from './Unauthorized';


//This route will be used for all locations starting with ./user/:username, and will redirect accordingly.
//Should deny access to user routes if the :username parameter doesn't match the authorized username.
function UserRouter() {

    const currentUser = useContext(UserContext);

    let { path, url } = useRouteMatch();
    
    console.log(path, url);

    const { username } = useParams();


    if(currentUser.isAuth) {
        
        if(username==="unauthorized") return (<Unauthorized/>)

        if(username !== currentUser.username) return (<Redirect to="/user/unauthorized"/>)
        
    }

    
    return (
        
        <Switch>
            <ProtectedRoute path={url + '/my-listings'}>
                <UserListings/>
            </ProtectedRoute>

            <ProtectedRoute path={url + '/edit'}>
                <EditUserProfile/>
            </ProtectedRoute>

            <ProtectedRoute exact path={url}>
                <Dashboard/>
            </ProtectedRoute>

        </Switch>
    )
}


export default UserRouter;