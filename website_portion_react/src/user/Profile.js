import React, { useContext } from 'react';
import UserContext from '../user/UserContext';

//Using user context, Profile will determine whether to load user's listings and requests or to redirect to a sign up page.

function Profile() {

    const userContext = useContext(UserContext);

    return(
        <h1>Profile of {userContext.username}</h1>
    )
}


export default Profile;