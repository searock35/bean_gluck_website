import React, { useContext } from "react";
//Tools
import { Route, Switch, useParams } from "react-router-dom";
import UserContext from "../react/UserContext";
//Components
import UserListings from "../../components/user/UserListings";
import Dashboard from "../../components/user/dashboard/Dashboard";
import EditUserProfile from "../../components/user/EditUserProfile";
import Unauthorized from "../../components/user/Unauthorized";
import UserViewer from "../../components/user/UserViewer";

/**
 * This route will be used for all locations starting with ./user/:username, and will redirect accordingly.
 * Should deny access to user routes if the :username parameter doesn't match the authorized username.
 */
function UserRouter(props) {
    const currentUser = useContext(UserContext);
    const { username } = useParams();

    if (props.userLoading) {
        return <h1>Loading user info...</h1>;
    } else if (currentUser.username !== username) {
        return (
            <Switch>
                <Route exact path={"/user/:username/"}>
                    <UserViewer />
                </Route>

                <Route component={Unauthorized} />
            </Switch>
        );
    } else {
        return (
            <Switch>
                <Route path={"/user/:username/my-listings"}>
                    <UserListings />
                </Route>

                <Route path={"/user/:username/edit"}>
                    <EditUserProfile />
                </Route>

                <Route exact path="/user/:username/">
                    <Dashboard />
                </Route>
            </Switch>
        );
    }
}

export default UserRouter;
