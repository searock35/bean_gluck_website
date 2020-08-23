import React, { useContext } from 'react';
import UserContext from './userComponents/UserContext';
import { Link } from 'react-router-dom';


function TestComponent() {

    console.log("TestComponent");
    const userContext = useContext(UserContext);

    return (
        <div>
            <button onClick={() => console.log(userContext.username)}><Link to="/user/searock35/dashboard">{userContext.username}</Link></button>
        </div>
    )
}


export default TestComponent;