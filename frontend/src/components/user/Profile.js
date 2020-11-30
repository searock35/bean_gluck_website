import React from 'react';
import ProtectedRoute from '../auth/ProtectedRoute';
import { Switch, useRouteMatch } from 'react-router-dom';
import UserListings from './UserListings';
import Dashboard from './Dashboard';
import EditUserProfile from'./EditUserProfile';

//Using user context, Profile will determine whether to load user's listings and requests or to redirect to a sign up page.

function Profile() {


    console.log(useRouteMatch());

    return (

        <Switch>
            <ProtectedRoute exact path="/user/:username/">
                <Dashboard/>
            </ProtectedRoute>
            
            <ProtectedRoute path="/user/:username/my-listings">
                <UserListings/>
            </ProtectedRoute>

            <ProtectedRoute path="/user/:username/edit">
                <EditUserProfile/>
            </ProtectedRoute>
        </Switch>
    )
}


export default Profile;