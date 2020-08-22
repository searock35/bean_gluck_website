import React, { useState } from 'react';
import auth from '../api/auth';
import { Redirect, useHistory } from 'react-router-dom';


function Login(props) {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const history = useHistory();

    if(auth.isAuth()) {
        return ( 
            <Redirect to="/" />
        )
    } else {
        return (
            <div>
                enter username:
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
                enter pass:

                <input type="text" value={pass} onChange={(event) => setPass(event.target.value)}/>
                <button onClick={() => auth.login(() => history.push('/'), username, pass)}>Login</button>
                <button onClick={() => auth.logout(() => console.log("callback"))}>Logout</button>
            </div>
        )  
    } 
}

export default Login;