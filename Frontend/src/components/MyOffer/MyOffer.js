import React, { Component } from "react";
import MyOfferHeader from "./MyOfferHeader";
import Navbar from "../Navbar/navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import "./Offer.css";
import { address } from "../../js/helper/constant";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
class MyOffer extends Component {
  state = {
    navarr: ["rgb(0, 106, 255)", "black"],
    openOffers: [],
  };

  componentDidMount() {
    //change the id of user after kena complete
    axios
      .get(`${address}/offer/1/open`)
      .then((response) => {
          console.log(response.data)
        this.setState({ openOffers: response.data });
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: false,
        });
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <MyOfferHeader navarr={this.state.navarr}></MyOfferHeader>
        <div className="container">
          {this.state.openOffers.map((offer) => (
                  <Accordion.Toggle as={Card.Header} eventKey="0" className="gray-auto-matching">
              <ListGroup.Item
                variant="secondary"
                className="list-group-style-auto-matching "
              >
                <Row className="header-bold-auto-matching ">
                  <Col>Offer ID</Col>
                  <Col>Username</Col>
                  <Col>Country(des)</Col>
                  <Col>Currency(des)</Col>
                  <Col>Amount(des)</Col>
                  <Col>Amount(src)</Col>
                  <Col>Country(src)</Col>
                  <Col>Currency(src)</Col>
                  <Col>Exp Date</Col>
                </Row>
                <Row>
                  <Col>#{offer.id}</Col>
                  <Col>Username</Col>
                  <Col>{offer.destinationCountry}</Col>
                  <Col>{offer.destinationCurrency}</Col>
                  <Col>{offer.amountInDes}</Col>
                  <Col>{offer.amountInSrc}</Col>
                  <Col>{offer.sourceCountry}</Col>
                  <Col>{offer.sourceCurrency}</Col>
                  <Col>{offer.expirationDate}</Col>
                </Row>
              </ListGroup.Item>
              </Accordion.Toggle>
          ))}
        </div>
      </div>
    );
  }
}

export default MyOffer;
