import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { auth } from "../../js/helper/firebase";

class NavigationBar extends Component {
    handleLogout = () => {
        auth.signOut();
        localStorage.clear();
    }
    render() {
        let message ="Hi, "+ localStorage.getItem("nickname");
        return (
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/home">DirectExchange</Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <NavDropdown title={message}>
                            <NavDropdown.Item href={"/accounts/"+localStorage.getItem("id")}>My Accounts</NavDropdown.Item>
                            <NavDropdown.Item href="/sendMessage">Send a message</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/auth" onClick={this.handleLogout}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/postOffer">Post an offer</Nav.Link>
                        <Nav.Link href="/prevailingRates">Prevailing Rates</Nav.Link>
                        <Nav.Link href="/browseoffer">Browse and Filter</Nav.Link>
                        <Nav.Link href="/myOffer/open">My Offers</Nav.Link>
                        <Nav.Link href="/transactionHistory">System Report</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default NavigationBar;
