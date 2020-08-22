import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import auth from '../api/auth';


//Helper function that returns correct user links for whether the user is logged in or logged out
function UserNavDropdown(props) {


    if(props.isAuth) {
        console.log("Auth recognized by navDropdown")
        return(
            // Show "My Profile" and "Log Out"
            <NavDropdown title={auth.currentUser.username} id="user-nav-dropdown">
                <NavDropdown.Item eventKey="/profile">My Profile Page</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
        )
    }
    else {
        console.log("Auth NOT recognized by navDropdown")
        return(
            <NavDropdown title="Hello, guest!">
                <NavDropdown.Item eventKey="/login">Login</NavDropdown.Item>
                <NavDropdown.Item eventKey="/register">Register</NavDropdown.Item>
            </NavDropdown>
        )
    }
}


function HomeNavbar() {
    
    const [authState, setAuthState] = useState(auth.isAuth());
    auth.addStateManager(setAuthState);
    const history = useHistory();

    function handleSelect(eventKey) {
        eventKey==="/logout" ? auth.logout(() => history.push('/')) : history.push(eventKey);
    } 

    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>TextTrader</Navbar.Brand>
            <Nav className="mr-auto" onSelect={handleSelect}>
                <Nav.Link eventKey="/">Home</Nav.Link>
                <Nav.Link eventKey="/donate">Donate</Nav.Link>
                <UserNavDropdown isAuth={authState}/>
            </Nav>
        </Navbar>
    )

}

export default HomeNavbar;