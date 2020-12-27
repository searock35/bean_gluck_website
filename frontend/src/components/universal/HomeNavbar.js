import React, { useContext, useState } from "react";
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
                    My Profile Page
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
        );
    } else {
        return (
            <NavDropdown title="Hello, Guest!">
                <NavDropdown.Item onClick={()=>props.setModalVisible(true)}>Login</NavDropdown.Item> {/*eventKey="/login"*/}
                <NavDropdown.Item eventKey="/register">
                    Register
                </NavDropdown.Item>
            </NavDropdown>
        );
    }
}

function HomeNavbar() {
    const history = useHistory();
    const currentUser = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);

    function handleLogoutEvent() {
        currentUser.changeUserContext(auth.getDefaultUser());
        auth.logout();
        history.push("/");
    }

    function handleSelect(eventKey) {
        eventKey === "/logout" ? handleLogoutEvent() : history.push(eventKey);
    }

    function loginHideHandler(e) {
        setModalVisible(false);
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>TextTrader</Navbar.Brand>
                <Nav className="mr-auto" onSelect={handleSelect}>
                    <Nav.Link eventKey="/">Home</Nav.Link>
                    <Nav.Link eventKey="/donate">Donate</Nav.Link>
                    <UserNavDropdown setModalVisible={setModalVisible}/>
                </Nav>
            </Navbar>
            <AuthModal show={modalVisible} onHideHandler={loginHideHandler}/>
        </>
    );
}

export default HomeNavbar;
