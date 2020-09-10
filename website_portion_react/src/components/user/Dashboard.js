import React, { useContext } from 'react';
import UserContext from '../../tools/react/UserContext';
import { Link } from 'react-router-dom';


function Dashboard() {
    
    const currentUser = useContext(UserContext);

    return (
        <div>
            Dashboard for {currentUser.username}
            <Link to={"./" + currentUser.username + "/my-listings"}>My Listings</Link>
        </div>
    )
}

export default Dashboard;