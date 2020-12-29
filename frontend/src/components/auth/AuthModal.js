import React, { } from "react";
import { Modal } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";

/**
 * A modal which includes the login props.
 * @param {Function} setMode A CB to the prop that controls the mode and visibility of the modal.
 * @param {String} mode The mode the modal will be in.
 * Options are "register", "login", or "hide"
 */
const AuthModal = (props) => {
    return (
        <div>
            <Modal
                show={props.mode !== "hide"}
                onHide={() => props.setMode("hide")}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <button onClick={() => props.setMode("login")}>
                            Login
                        </button>{" "}
                        /{" "}
                        <button onClick={() => props.setMode("register")}>
                            Register
                        </button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.mode === "login" ? <Login /> : <></>}
                    {props.mode === "register" ? <Register /> : <></>}
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={() => console.log("Clicked")}>
                        Click me!
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    );
};

export default AuthModal;
