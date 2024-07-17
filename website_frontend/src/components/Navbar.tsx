import { ReactComponentElement } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";


function CustomNavbar() {
    return (<>
        <Navbar expand="lg" className="navbar-dark bg-primary">
            <Navbar.Brand href="#">GamePlatform</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>)

}
export default CustomNavbar;

