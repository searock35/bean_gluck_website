import React, { useState, useContext } from 'react';
import auth from './authAPI';
import { Redirect, useHistory } from 'react-router-dom';
import UserContext from '../user/UserContext';


function Login(props) {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const history = useHistory();

    const currentUser = useContext(UserContext);

    function loginCb(newUser) {
        currentUser.changeUserContext(newUser);
        history.goBack();
    }

    function handleLoginEvent(e) {
        auth.login(loginCb, username, pass);
    }


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
                <button onClick={handleLoginEvent}>Login</button>
            </div>
        )  
    } 
}

export default Login;