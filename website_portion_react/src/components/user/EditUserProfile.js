import React, { useContext } from 'react';
import UserContext from '../../tools/react/UserContext';


function EditUserProfile() {
    const currentUser = useContext(UserContext);

    return (
        <div>
            Edit User Profile Page for {currentUser.username}
        </div>
    )
}

export default EditUserProfile;