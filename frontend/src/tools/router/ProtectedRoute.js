import React, { useContext } from "react";
import { Route, useHistory } from "react-router-dom";
import UserContext from "../react/UserContext";

/**
 * A route that only renders items if the user is logged in. Else, redirects the user to the login page.
 * Should only be used with children, not with the "component" prop.
 *
 */
function ProtectedRoute({ children, ...rest }) {
    const history = useHistory();
    const currentUser = useContext(UserContext);

    if (rest.userLoading) {
        return <h1>Loading user info...</h1>;
    } else if (currentUser.isAuth) {
        return <Route {...rest} render={() => children}></Route>;
    } else {
        return (
            <Route
                {...rest}
                render={() => (
                    <h1>
                        You must be logged in to view this page.{" "}
                        <button onClick={() => history.push("/login")}>
                            Login
                        </button>
                    </h1>
                )}
            />
        );
    }
}

export default ProtectedRoute;
