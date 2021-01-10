import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import auth from "../../tools/api/authAPI";
import UserContext from "../../tools/react/UserContext";
import AuthModal from "../auth/AuthModal";

//Helper function that returns correct user links for whether the user is logged in or logged out
/**
 * 
 * @param {Function} setModalVisible A CB function set state function to set login modal visibility
 */
function UserNavDropdown(props) {
    const currentUser = useContext(UserContext);
    if (currentUser.isAuth) {
        return (
            // Show "My Profile" and "Log Out"
            <NavDropdown
                title={"Hello, " + currentUser.username + "!"}
                id="user-nav-dropdown"
            >
                <NavDropdown.Item eventKey={"/user/" + currentUser.username}>
                    My Dashboard
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
        );
    } else {
        return (
            <>
                <Nav.Link id="navbar-login-button" onClick={()=>props.setModalMode("login")}>Login</Nav.Link> {/*eventKey="/login"*/}
                <Nav.Link id="navbar-register-button" onClick={()=>props.setModalMode("register")}>
                    Register
                </Nav.Link>
            </>
       );
    }
}

function HomeNavbar() {
    const history = useHistory();
    const currentUser = useContext(UserContext);
    const [modalMode, setModalMode] = useState("hide");


    function handleLogoutEvent() {
        currentUser.changeUserContext(auth.getDefaultUser());
        auth.logout();
        history.push("/");
    }

    function handleSelect(eventKey) {
        eventKey === "/logout" ? handleLogoutEvent() : history.push(eventKey);
    }

    useEffect(() => {
        if (currentUser.isAuth) {
            setModalMode("hide")
        }
    }, [currentUser.isAuth])

    return (
        <>
            <Navbar className="header" bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>TextTrader</Navbar.Brand>
                <Nav className="mr-auto" onSelect={handleSelect}>
                    <Nav.Link eventKey="/">Home</Nav.Link>
                    <UserNavDropdown setModalMode={setModalMode}/>
                </Nav>
            </Navbar>
            <AuthModal mode={modalMode} setMode={setModalMode}/>
        </>
    );
}

export default HomeNavbar;
