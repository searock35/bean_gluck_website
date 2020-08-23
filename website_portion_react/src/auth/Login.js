import React, { useState, useContext } from 'react';
import auth from './auth';
import { Redirect, useHistory } from 'react-router-dom';
import UserContext from '../user/UserContext';


function Login(props) {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const history = useHistory();

    const currentUser = useContext(UserContext);

    function handleLoginEvent(e) {

        console.log(currentUser.username);
        const newUser = auth.login(() => history.goBack(), username, pass);
        currentUser.changeUserContext(newUser);
        console.log(currentUser.username);
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