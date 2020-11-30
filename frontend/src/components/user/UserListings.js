import React, { useContext } from 'react';
import UserContext from '../../tools/react/UserContext';

function UserListings() {
    
    const userValue = useContext(UserContext);
    return (
        <div> 
            This is my listing for me, the user. {userValue.username}
        </div>
    )
}

export default UserListings;