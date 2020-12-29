


import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../tools/react/UserContext';
import AuthModal from './AuthModal';

/**
 * A modal which includes the login props and will hide itself on user login.
 * @param {Function} setMode A CB to the prop that controls the mode and visibility of the modal.
 * @param {String} mode The mode the modal will be in.
 * Options are "register", "login", or "hide"
 */
const AuthModalWithContext = (props) => {
    const currentUser = useContext(UserContext);

    const [mode, setMode] = useState(
        currentUser.isAuth ? "hide" : "login"
    );

    useEffect(() => {
        if (mode === "hide" && !currentUser.isAuth) {
            alert("Login or register to create a resource.");
            setMode("login");
        } else if (currentUser.isAuth) setMode("hide")
    }, [currentUser.isAuth, mode]);

    return (
        <AuthModal mode={mode} setMode={setMode} />
    );
}

export default AuthModalWithContext;
