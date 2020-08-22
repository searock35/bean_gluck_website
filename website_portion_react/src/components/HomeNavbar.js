import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


//Helper function that returns correct user links for whether the user is logged in or logged out
function UserNav(props) {
    if(props.user.isAuthenticated) {
        return(
            // Show "My Profile" and "Log Out"
            <NavDropdown title={props.user.username} id="user-nav-dropdown">
                <NavDropdown.Item><Link to="/profile">My Profile Page</Link></NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item><Link to="/logout">Logout</Link></NavDropdown.Item>
            </NavDropdown>
        )
    }
    else {
        return(
            <NavDropdown title="Hello, guest!">
                <NavDropdown.Item><Link to="/login">Login</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/register">Register</Link></NavDropdown.Item>
            </NavDropdown>
        )
    }
}


class HomeNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.currentUser = props.user;
    }
    
    render() {
        return(
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">BookWorms</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Item><Link to="/" style={{ textDecoration: 'none' }}>Home</Link></Nav.Item>
                    <Nav.Item><Link to="/donate">Features</Link></Nav.Item>
                    <UserNav user={this.currentUser}></UserNav>
                </Nav>
            </Navbar>
        )
    }
}

export default HomeNavbar;