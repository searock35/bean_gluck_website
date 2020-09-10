import React, { useContext } from 'react';
//Tools
import { Route, Switch, Redirect, useRouteMatch, useParams } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import UserContext from '../react/UserContext';
//Components
import UserListings from '../../components/user/UserListings';
import Dashboard from '../../components/user/Dashboard';
import EditUserProfile from'../../components/user/EditUserProfile';
import Unauthorized from '../../components/user/Unauthorized';


//This route will be used for all locations starting with ./user/:username, and will redirect accordingly.
//Should deny access to user routes if the :username parameter doesn't match the authorized username.
function UserRouter() {

    const currentUser = useContext(UserContext);

    let { url } = useRouteMatch();
    
    const { username } = useParams();

    if(username !== currentUser.username) return (<Redirect to="/user/unauthorized"/>)
    
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

            <Route path="/user/unauthorized" component={Unauthorized} />

        </Switch>
    )
}


export default UserRouter;