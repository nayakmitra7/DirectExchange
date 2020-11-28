import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class NavigationBarLanding extends Component {

    render() {
        return (


            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/home">DirectExchange</Navbar.Brand>
                <Nav className="mr-auto">

                </Nav>
                <Nav>
                    <Nav.Link href="/register">Sign Up</Nav.Link>
                    <Nav.Link href="">Login</Nav.Link>
                </Nav>
            </Navbar>


        )
    }
}
export default NavigationBarLanding;