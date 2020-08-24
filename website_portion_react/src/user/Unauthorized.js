import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';


function Unauthorized() {

    const currentUser = useContext(UserContext);

    return (
        <div>
            You are not authorized to view this page, it belongs to another user. Try putting in a link with your own username, for example:
            <h1>
                <Link to={"/user/" + currentUser.username + "/"}>{"/user/" + currentUser.username + "/"}</Link>
            </h1>
        </div>
    )
}

export default Unauthorized;