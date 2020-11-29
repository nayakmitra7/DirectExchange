import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import firebase, { auth } from "../../js/helper/firebase";

class NavigationBarLanding extends Component {
    handleLogout = () => {
        auth.signOut();
        localStorage.clear();
    }
    render() {

        return (


            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/home">DirectExchange</Navbar.Brand>
                <Nav className="mr-auto">

                </Nav>
                <Nav>
                    <Nav.Link href="/auth" onClick={this.handleLogout}>Sign Up</Nav.Link>
                    <Nav.Link href="/auth" onClick={this.handleLogout}>Login</Nav.Link>
                </Nav>
            </Navbar>


        )
    }
}
export default NavigationBarLanding;