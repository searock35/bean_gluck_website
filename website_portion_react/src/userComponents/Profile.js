import React from 'react';
import auth from '../api/auth';

//Using user context, Profile will determine whether to load user's listings and requests or to redirect to a sign up page.

function Profile() {

    if(auth.isAuth()) console.log('user logged in');

    return(

        <h1>Profile of {auth.getUser().username}</h1>

    )
}


export default Profile;