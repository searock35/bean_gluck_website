import React from 'react';

//Using user context, Profile will determine whether to load user's listings and requests or to redirect to a sign up page.

class Profile extends React.Component {
    constructor(props) {
        super(props)
        
        
        if(props.user.isLoggedIn) {
            console.log("user is logged in")
        }
    }
    render() {
        return(
            <h1>Profile of {this.props.user.username}</h1>
        )
    }
}


export default Profile;