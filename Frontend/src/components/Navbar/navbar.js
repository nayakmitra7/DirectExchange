import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class NavigationBar extends Component {
  render() {
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/home">DirectExchange</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <NavDropdown title="My Services">
              <NavDropdown.Item href="">My Offers</NavDropdown.Item>
              <NavDropdown.Item href="">Send a message</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/postOffer">Post an offer</Nav.Link>
            <Nav.Link href="/prevailingRates">Prevailing Rates</Nav.Link>
            <Nav.Link href="/browseoffer">Browse and Filter</Nav.Link>
            <Nav.Link href="/myOffer/open">My Offers</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default NavigationBar;
