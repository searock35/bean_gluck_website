import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';

/**
 * A modal which includes the login props.
 * @param {bool} show Show or hide the modal
 * @param {Function} onHideHandler Function to be called onHide 
 * @param {String} defaultMode The default auth mode showed upon opening, "register" or "login"
 */
const AuthModal = (props) => {
    const defaultMode = (props.defaultMode) ? props.defaultMode : "login"
    const [mode, setMode] = useState(defaultMode)

    return (
        <div>
            <Modal show={props.show} onHide={props.onHideHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <button onClick={()=>setMode("login")}>Login</button> / <button onClick={()=>setMode("register")}>Register</button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {mode==="login" ? <Login/> : <Register/>}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>console.log("Clicked")}>
                        Click me!
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AuthModal;
